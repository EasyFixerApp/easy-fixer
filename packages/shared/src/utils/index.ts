import z from "zod";

/**
 * @description
 * Create a Zod schema for API responses.
 * This schema is mainly used to create an openapi schema for the API response.
 * This schema can be used to ensure that the response data conforms to the expected format.
 * @param dataSchema - The Zod schema for the data object.
 * @returns A Zod schema for the API response.
 */
export function generateSuccessResponseSchema(
  dataSchema: z.ZodType,
): z.ZodType {
  return z.object({
    data: dataSchema,
    message: z.string().optional(),
    success: z.boolean().default(true),
  });
}
