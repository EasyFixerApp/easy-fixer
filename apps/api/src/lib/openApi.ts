import config from "#config";
import { createResponseSchema } from "#utils";
import { generateSchema } from "@anatine/zod-openapi";
import { OpenApiBuilder, OpenAPIObject } from "openapi3-ts/oas31";
import swaggerJsdoc, { OAS3Definition } from "swagger-jsdoc";
import z from "zod";

export interface ZodToOpenApi extends OpenApiBase {
  schema: z.ZodType;
}

export interface ZodToOpenApiResponse extends OpenApiBase {
  dataSchema: z.ZodType;
}

interface OpenApiBase {
  description: string;
  example: unknown;
  name: string;
}

// get specs from yaml-jsdoc annotated with @openapi in routes
const commentSpecs = swaggerJsdoc(
  config.oas.jsdocParserOptions,
) as OAS3Definition;

// create an openapi builder initialized with the comment specs
// if used on a first-level module, it should be added to config/registry.ts
export const openApiBuilder = new OpenApiBuilder(
  commentSpecs as unknown as OpenAPIObject,
);

// an openapi utility that converts zod schemas to openapi schemas
// can be added then to the specs using openApiBuilder.addSchema
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
