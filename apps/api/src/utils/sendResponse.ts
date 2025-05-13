import { ReasonPhrases } from "http-status-codes";
import z from "zod";

export function createResponseJson<T>(
  data: SuccessResponse<T>,
): ApiResponse<T> {
  return {
    data: data.data,
    message: data.message || ReasonPhrases.OK,
    success: true,
  };
}

export function createResponseZodSchema(dataSchema: z.ZodType) {
  return z.object({
    data: dataSchema,
    message: z.string().optional(),
    success: z.boolean().default(true),
  });
}
