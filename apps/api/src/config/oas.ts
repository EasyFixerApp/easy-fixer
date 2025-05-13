import path from "path";
import { OAS3Definition, OAS3Options } from "swagger-jsdoc";

import { env } from "./env.js";

const definition: OAS3Definition = {
  info: {
    description: "Documentation for the Express API",
    title: "API Documentation",
    version: "1.0.0",
  },
  openapi: "3.1.1",
  servers: [
    {
      description: "API v1",
      url: "/api/v1",
    },
  ],
};

const jsdocParserOptions: OAS3Options = {
  apis: ["./src/features/**/router.ts"], // Path to the API docs
  definition,
  failOnErrors: true,
};

const provide = {
  // File names
  files: {
    json: {
      create: true,
      filename: "oas.json",
    },
    yaml: {
      create: true,
      filename: "oas.yaml",
    },
    // eslint-disable-next-line perfectionist/sort-objects
    outputDir: path.resolve("./docs"),
  },

  // UI settings
  ui: {
    endpoint: "/api-docs",
    serve: env.NODE_ENV === "development",
  },
};

export const oas = {
  definition,
  jsdocParserOptions,
  provide,
};
