import z from "zod";

export const checked = z.object({
  db: z.enum(["up", "down"]),
});

export const toCreate = z.object({
  email: z.string().email().optional(),
});

export const created = toCreate.extend({
  id: z.number(),
  timeStamp: z.string(),
});
