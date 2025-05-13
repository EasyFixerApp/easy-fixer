import config from "#config";
import { generateSchema, OpenApiZodAny } from "@anatine/zod-openapi";
import { OpenApiBuilder, OpenAPIObject } from "openapi3-ts/oas31";
import swaggerJsdoc, { OAS3Definition } from "swagger-jsdoc";

const commentSpecs = swaggerJsdoc(
  config.oas.jsdocParserOptions,
) as OAS3Definition;

export const openApiBuilder = new OpenApiBuilder(
  commentSpecs as unknown as OpenAPIObject,
);

export const zodToOpenApi = (schema: OpenApiZodAny) =>
  generateSchema(schema, true, "3.1");
