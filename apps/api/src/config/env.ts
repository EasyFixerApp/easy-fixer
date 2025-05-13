// ! Do not include any sensitive information in this file
// * Any interaction with process.env should go through this object
// ? Why? Centralized, typed, and validated environment configuration
// ? why? Easier way to know what environment variables are required

import { z } from "zod";

// This check is used to allow leaner behaviors outside of production
// example: providing default values for local development
const isNotProduction = process.env.NODE_ENV !== "production";

// 1. Define the schema for the environment variable
export const envSchema = z.object({
  DATABASE_URL: isNotProduction
    ? z
        .string()
        .url({ message: "Invalid database URL" })
        .default(
          "postgresql://easy-fixer:my-password@localhost:5433/easy-fixer-db",
        )
    : z.string().url({ message: "Invalid database URL" }),

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

// 4. Export the validated environment variables
export const env: EnvironmentVariables = getEnv();
