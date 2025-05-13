import { z } from "zod";

export const userCreateInput = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(255).optional(),
});

export const createdUser = userCreateInput.extend({
  id: z.number(),
});

export type UserCreateInput = z.infer<typeof userCreateInput>;
