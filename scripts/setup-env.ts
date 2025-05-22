#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";

// Environment configurations
const API_ENV_CONTENT = {
  DATABASE_URL: {
    value: "postgresql://easy-fixer:my-password@localhost:5433/easy-fixer-db",
    quoted: true,
  },
  PORT: "4000",
};

const WEB_ENV_CONTENT = {
  API_URL: {
    value: "http://localhost:4000/api/v1",
    quoted: true,
  },
  PORT: "3000",
};

/**
 * Main function to create environment files
 */
const main = async () => {
  logSeparator("Environment Setup for Easy Fixer Apps");
  console.log("Setting up environment files for Easy Fixer apps...");
  console.log("This only works for DEVELOPMENT mode.");

  try {
    const projectRoot = process.cwd();
    const apiDir = path.join(projectRoot, "apps/api");
    const webDir = path.join(projectRoot, "apps/web");

    // Create API .env file
    await createEnvFile(apiDir, API_ENV_CONTENT);

    // Create Web .env file
    await createEnvFile(webDir, WEB_ENV_CONTENT);

    console.log("🎉 Environment setup completed successfully!");
    logSeparator("Environment Setup Complete");
  } catch (error) {
    console.error("Error setting up environment files:", error);
    process.exit(1);
  }
};

/**
 * Log a section separator with title
 */
const logSeparator = (title) => {
  const line = "=".repeat(50);
  console.log(`\n${line}`);
  console.log(`  ${title}`);
  console.log(`${line}\n`);
};

/**
 * Parse an .env file content into an object
 */
const parseEnvFile = (content) => {
  const result = {};
  const lines = content.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      const [, key, value] = match;
      result[key.trim()] = value.trim().replace(/^["']|["']$/g, "");
    }
  }

  return result;
};

/**
 * Format a value according to its type and quotation requirements
 */
const formatEnvValue = (key, value) => {
  if (
    typeof value === "object" &&
    value !== null &&
    "value" in value &&
    "quoted" in value
  ) {
    return value.quoted ? `${key}="${value.value}"` : `${key}=${value.value}`;
  }
  return `${key}=${value}`;
};

/**
 * Convert an env object to .env file format
 */
const formatEnvContent = (envObj) => {
  return (
    Object.entries(envObj)
      .map(([key, value]) => formatEnvValue(key, value))
      .join("\n") + "\n"
  );
};

/**
 * Ensure directory exists
 */
const ensureDirectoryExists = async (directory) => {
  try {
    await fs.access(directory);
  } catch {
    console.log(`Creating directory: ${directory}`);
    await fs.mkdir(directory, { recursive: true });
  }
};

/**
 * Check if a file exists
 */
const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return false;
  }
};

/**
 * Compare existing env with required env and identify differences
 */
const compareEnvironments = (existingEnvObj, contentObj) => {
  // Get the normalized value for comparison
  const getNormalizedValue = (value) =>
    typeof value === "object" ? value.value : value;

  // Check for missing variables
  const missingVars = Object.keys(contentObj).filter(
    (key) => !(key in existingEnvObj),
  );

  // Check for variables with different values
  const differentVars = Object.keys(contentObj).filter((key) => {
    const contentValue = getNormalizedValue(contentObj[key]);
    return key in existingEnvObj && existingEnvObj[key] !== contentValue;
  });

  return { missingVars, differentVars };
};

/**
 * Log differences between environments
 */
const logDifferences = (
  differentVars,
  existingEnvObj,
  contentObj,
  envFilePath,
) => {
  if (differentVars.length > 0) {
    console.log(`⚠️  Variables with different values in ${envFilePath}:`);
    for (const key of differentVars) {
      console.log(
        `   - ${key}: Current="${existingEnvObj[key]}", Default="${contentObj[key]?.value || contentObj[key]}"`,
      );
      console.log(`     (keeping current value)`);
    }
  }
};

/**
 * Merge environments, adding missing variables
 */
const mergeEnvironments = (existingEnvObj, contentObj, missingVars) => {
  // Start with the existing environment
  const mergedEnv = { ...existingEnvObj };

  // Add missing variables
  for (const key of missingVars) {
    mergedEnv[key] = contentObj[key];
  }

  return mergedEnv;
};

/**
 * Log missing variables being added
 */
const logMissingVariables = (missingVars, contentObj, envFilePath) => {
  if (missingVars.length > 0) {
    console.log(`Adding missing variables to ${envFilePath}:`);
    for (const key of missingVars) {
      const valueDisplay =
        typeof contentObj[key] === "object" && contentObj[key].quoted
          ? `"${contentObj[key].value}"`
          : contentObj[key]?.value || contentObj[key];

      console.log(`   + ${key}=${valueDisplay}`);
    }
  }
};

/**
 * Create or update an .env file in the specified directory
 */
const createEnvFile = async (directory, contentObj) => {
  const envFilePath = path.join(directory, ".env");

  // Ensure the directory exists
  await ensureDirectoryExists(directory);

  // Track if the file exists and if variables were added
  const exists = await fileExists(envFilePath);
  let variablesAdded = false;
  let finalEnvObj = { ...contentObj };

  // If the file exists, check for differences
  if (exists) {
    const existingContent = await fs.readFile(envFilePath, "utf8");
    const existingEnvObj = parseEnvFile(existingContent);

    // Compare environments
    const { missingVars, differentVars } = compareEnvironments(
      existingEnvObj,
      contentObj,
    );

    // Log differences
    logDifferences(differentVars, existingEnvObj, contentObj, envFilePath);

    // If no changes needed, exit early
    if (missingVars.length === 0 && differentVars.length === 0) {
      console.log(
        `ℹ️  All environment variables already exist in ${envFilePath}. Skipping.`,
      );
      return;
    }

    // Merge environments
    finalEnvObj = mergeEnvironments(existingEnvObj, contentObj, missingVars);

    // Log and add missing variables
    if (missingVars.length > 0) {
      variablesAdded = true;
      logMissingVariables(missingVars, contentObj, envFilePath);

      // Backup the existing file
      const backupPath = `${envFilePath}.backup.${Date.now()}`;
      await fs.copyFile(envFilePath, backupPath);
      console.log(`⚠️  Existing .env file backed up to ${backupPath}`);
    }
  }

  // Write the .env file
  const formattedContent = formatEnvContent(finalEnvObj);
  await fs.writeFile(envFilePath, formattedContent, "utf8");

  // Log the result
  if (exists) {
    if (variablesAdded) {
      console.log(`✅ Updated ${envFilePath} with missing variables`);
    }
  } else {
    console.log(`✅ Created new ${envFilePath}`);
  }
};

// Run the script
main();
