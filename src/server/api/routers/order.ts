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
        request.headers["Prefer"] = "return=representation";
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
        return response.result;
      } catch (err) {
        throw new Error((err as { message: string }).message);
      }
    }),

  confirmPayment: publicProcedure
    .input(z.object({ giftId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.gift.update({
        where: { id: input.giftId },
        data: { qtd: { decrement: 1 } },
      });
    }),
});
