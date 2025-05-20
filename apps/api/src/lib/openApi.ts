import config from "#config";
import { generateSchema } from "@anatine/zod-openapi";
import { OpenApiBuilder, OpenAPIObject } from "openapi3-ts/oas31";
import swaggerJsdoc, { OAS3Definition } from "swagger-jsdoc";
import z from "zod";

// get specs from yaml-jsdoc annotated with @openapi in routes
const commentSpecs = swaggerJsdoc(
  config.oas.jsdocParserOptions,
) as OAS3Definition;

// create an openapi builder initialized with the comment specs
// if used on a first-level module, it should be added to config/registry.ts
export const openApiBuilder = new OpenApiBuilder(
  commentSpecs as unknown as OpenAPIObject,
);

interface OpenApiBase {
  description: string;
  example: unknown;
  name: string;
}

type ZodToOpenApi = Prettify<
  OpenApiBase & {
    schema: z.ZodType;
  }
>;

type ZodToOpenApiResponse = Prettify<
  OpenApiBase & {
    dataSchema: z.ZodType;
  }
>;
/**
 * @description
 * Create a Zod schema for API responses.
 * This schema is mainly used to create an openapi schema for the API response.
 * This schema can be used to ensure that the response data conforms to the expected format.
 * @param dataSchema - The Zod schema for the data object.
 * @returns A Zod schema for the API response.
 */
export function createResponseSchema(dataSchema: z.ZodType) {
  return z.object({
    data: dataSchema,
    message: z.string().optional(),
    success: z.boolean().default(true),
  });
}

/**
 * Convert a Zod schema to an OpenAPI schema.
 * @param args - The arguments for the OpenAPI schema.
 * @param args.schema - The Zod schema to convert.
 * @param args.description - The description of the schema.
 * @param args.example - An example of the schema.
 * @returns void but adds the schema to the OpenAPI builder.
 */
export const zodToOpenApi = (args: ZodToOpenApi) => {
  const oasSchema = generateSchema(args.schema, true, "3.1");
  oasSchema.description = args.description;
  oasSchema.example = args.example;

  openApiBuilder.addSchema(args.name, oasSchema);
};

/**
 * Convert a Zod schema to an OpenAPI response schema.
 * @param args - The arguments for the response schema.
 * @param args.dataSchema - The Zod schema for the data object.
 * @param args.description - The description of the response.
 * @param args.example - An example of the dataSchema and not the whole response.
 * @returns An OpenAPI response schema.
 */
export const zodToOpenApiSuccessResponse = (args: ZodToOpenApiResponse) => {
  const zodResponseSchema = createResponseSchema(args.dataSchema);
  zodToOpenApi({
    description: args.description,
    example: {
      data: args.example,
      message: "OK",
      success: true,
    },
    name: args.name,
    schema: zodResponseSchema,
  });
};

// TODO: add common openapi response schemas
