import config from "#config";
import { generateSchema, OpenApiZodAny } from "@anatine/zod-openapi";
import { OpenApiBuilder, OpenAPIObject } from "openapi3-ts/oas31";
import swaggerJsdoc, { OAS3Definition } from "swagger-jsdoc";

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
export const zodToOpenApi = (schema: OpenApiZodAny) =>
  generateSchema(schema, true, "3.1");

// TODO: add common openapi response schemas
