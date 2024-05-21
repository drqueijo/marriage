import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import paypal from "@paypal/checkout-server-sdk";
import paypalClient from "@/server/paypal";
import { z } from "zod";

export interface PaypalCreateOrderResponse {
  id: string;
  intent: string;
  status: string;
  purchase_units: PurchaseUnit[];
  create_time: Date;
  links: Link[];
}
export interface Link {
  href: string;
  rel: string;
  method: string;
}

export interface PurchaseUnit {
  reference_id: string;
  amount: Amount;
  payee: Payee;
}

export interface Amount {
  currency_code: string;
  value: string;
}

export interface Payee {
  email_address: string;
  merchant_id: string;
}

export interface PaypalCaptureOrderResponse {
  id: string;
  payer: {
    name: {
      given_name: string;
      surname: string;
    };
    email_address: string;
    payer_id: string;
  };
  status: string;
}

export const createOrderInput = z.object({
  value: z.number(),
});

export const orderRouter = createTRPCRouter({
  create: publicProcedure
    .input(createOrderInput)
    .mutation(async ({ input }) => {
      try {
        const PaypalClient = paypalClient();
        const request = new paypal.orders.OrdersCreateRequest();
        request.headers.Prefer = "return=representation";
        request.requestBody({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "BRL",
                value: input.value.toString(),
              },
            },
          ],
        });
        const response = await PaypalClient.execute(request);

        if (response.statusCode !== 201) {
          throw new Error("Failed to create order");
        }
        return response.result as PaypalCreateOrderResponse;
      } catch (err) {
        throw new Error((err as { message: string }).message);
      }
    }),
  captureOrder: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      try {
        const PaypalClient = paypalClient();
        const request = new paypal.orders.OrdersCaptureRequest(input);
        const response = await PaypalClient.execute(request);

        if (response.statusCode !== 201) {
          throw new Error("Failed to capture order");
        }
        return response.result as PaypalCaptureOrderResponse;
      } catch (err) {
        throw new Error((err as { message: string }).message);
      }
    }),

  confirmPayment: publicProcedure
    .input(z.object({ giftId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const gift = await ctx.db.gift.update({
        where: { id: input.giftId },
        data: { qtd: { decrement: 1 } },
      });

      return await ctx.db.order.create({
        data: {
          gift: { connect: { id: input.giftId } },
          status: "PENDING",
          price: gift.price,
          createdAt: new Date(),
          message: ``,
          userId: "anonymous",
          method: "PAYPAL",
        },
      });
    }),

  saveOrder: publicProcedure
    .input(
      z.object({
        giftId: z.number(),
        paymentData: z.object({
          name: z.string().optional(),
          lastName: z.string().optional(),
          email: z.string().optional(),
          userId: z.string().optional(),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { userId, email, lastName, name } = input.paymentData;
      const gift = await ctx.db.gift.findUnique({
        where: { id: input.giftId },
      });
      if (!gift) return;

      await ctx.db.gift.update({
        where: { id: input.giftId },
        data: { qtd: { decrement: 1 } },
      });

      return await ctx.db.order.create({
        data: {
          gift: { connect: { id: input.giftId } },
          status: "COMPLETED",
          price: gift.price,
          createdAt: new Date(),
          message: `${name} ${lastName} ${email}`,
          userId: userId ?? "anonymous",
          method: "PAYPAL",
        },
      });
    }),
  get: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.order.findMany({
      include: { gift: true },
    });
  }),
  updateStatus: publicProcedure
    .input(z.object({ id: z.number(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.order.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),
});
