import { z } from "zod";

export const toCreate = {
  schema: z.object({
    email: z.string().email(),
    name: z.string().min(1).max(255).optional(),
  }),
};

export const created = {
  schema: toCreate.schema.extend({
    id: z.number(),
  }),
};

// Types --------------------------------------------------

export type CreatedUser = z.infer<typeof created.schema>;

export namespace CreateTypes {
  export type Request = z.infer<typeof toCreate.schema>;
  export type Response = ApiResponse<CreatedUser>;
}
