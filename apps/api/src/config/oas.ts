import path from "path";
import { OAS3Definition, OAS3Options } from "swagger-jsdoc";

import { env } from "./env.js";

/**
 * @description
 * OAS (OpenAPI Specification) is a standard for defining/describing/documenting APIs
 * Swagger is a tool that uses OAS to provide more documentation tools such as UI
 * This file is responsible for any configuration related to OAS and any tools that use OAS such as Swagger UI
 */

// General OAS fields
const definition: OAS3Definition = {
  info: {
    description: "Documentation for the Easy Fixer API",
    title: "API Documentation",
    version: "1.0.0",
  },
  openapi: "3.1.1",
  servers: [
    {
      description: "Local Server",
      url: `http://localhost:${env.PORT}/api/v1`,
    },
    {
      description: "Production Server",
      url: "", //TODO: Add production URL
    },
  ],
};

// Swagger-jsdoc adds the YAML JSDocs to the OpenAPI definition
const jsdocParserOptions: OAS3Options = {
  apis: ["./src/features/**/router.ts", "./src/features/**/**.router.ts"], // Path to the API docs
  definition,
  failOnErrors: true,
};

// The collected and generated OAS will be provided according to the options
const provide = {
  // Create the OAS files options
  files: {
    dir: path.resolve("./docs"),
    json: {
      create: true,
      filename: "oas.json",
    },
    yaml: {
      create: true,
      filename: "oas.yaml",
    },
  },

  // Serve the OAS UI through the API
  ui: {
    path: "/api-docs",
    serve: env.NODE_ENV === "development",
  },
};

export const oas = {
  definition,
  jsdocParserOptions,
  provide,
};
