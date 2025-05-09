// ! Any interaction with process.env should be done in this file
// ! Do not include any sensitive information in this file
// Centralized, typed, and validated environment configuration

import { z } from "zod";

// 1. Define schema for expected environment variables
const envSchema = z.object({
  DATABASE_URL: z.string().min(1, {
    message: "DATABASE_URL is required and cannot be empty",
  }),
  LOG_LEVEL: z
    .enum(["error", "warn", "info", "http", "verbose", "debug", "silly"])
    .default("http"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(4000),
});

// 2. Parse & validate process.env against the schema
export const env = envSchema.parse(process.env);
