import { z } from "zod";

/**
 * @description
 * This file is responsible for loading and validating environment variables
 * Any interaction with process.env should go through this object
 * Why? Centralized, typed, and validated environment configuration
 * why? Easier way to know what environment variables are required
 * ! Do not include any sensitive information in this file
 */

// This check is used to allow leaner behaviors outside of production. Example: providing default values for local development

// 1. Define the schema for the environment variable
export const envSchema = z.object({
  DATABASE_URL: z.string().url({
    message:
      'Invalid database URL: if the api is in your local add this DATABASE_URL="postgresql://easy-fixer:my-password@localhost:5433/easy-fixer-db"',
  }),

  HOST: z.string().min(2).default("localhost"),

  LOG_LEVEL: z
    .enum(["error", "warn", "info", "http", "verbose", "debug", "silly"])
    .default("http"),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(4000),
});

// 2. Infer the type of the environment variable
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EnvironmentVariables extends z.infer<typeof envSchema> {}

// 3. Parse & validate process.env against the schema
const getEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // eslint-disable-next-line no-console
      console.error("Invalid environment variables:", error.errors);
      process.exit(1);
    } else throw error;
  }
};

// 4. Get and export the validated environment variables
export const env: EnvironmentVariables = getEnv();
