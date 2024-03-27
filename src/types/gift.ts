import { z } from "zod";

export const GiftSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  qtd: z.number().int().min(1),
  price: z.number().int().min(1),
  image: z.string().url(),
  description: z.string(),
  orders: z.array(z.any()).optional(),
  createdById: z.string().optional().default("ADMIN"),
});

export const updateGiftInput = GiftSchema.omit({
  createdAt: true,
  updatedAt: true,
  orders: true,
});

export const createGiftInput = GiftSchema.omit({
  orders: true,
  createdAt: true,
  updatedAt: true,
  id: true,
});

export type CreateGiftSchema = z.infer<typeof createGiftInput>;
export type GiftUpdateSchema = z.infer<typeof updateGiftInput>;
export type Gift = z.infer<typeof GiftSchema>;
