import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createGiftInput, Gift, updateGiftInput } from "@/types/gift";

export const giftRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.gift.findMany();
  }),
  create: publicProcedure
    .input(createGiftInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.gift.create({ data: input });
    }),
  update: publicProcedure
    .input(updateGiftInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.gift.update({
        where: { id: input.id },
        data: input,
      });
    }),

  delete: publicProcedure
    .input(updateGiftInput.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.gift.delete({ where: { id: input.id } });
    }),

  getById: publicProcedure
    .input(updateGiftInput.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return ctx.db.gift.findUnique({ where: { id: input.id } });
    }),
});
