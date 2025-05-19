import { time, timeStamp } from "console";
import z from "zod";
import { generateSuccessResponseSchema } from "../utils/index.js";

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

export const checkResponse = generateSuccessResponseSchema(checked);
export const writeDeleteResponse = generateSuccessResponseSchema(created);

export const health = {
  checked,
  toCreate,
  created,
  checkResponse,
  writeDeleteResponse,
};
