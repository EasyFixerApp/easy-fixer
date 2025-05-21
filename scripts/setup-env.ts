#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";

const API_ENV_CONTENT = `DATABASE_URL="postgresql://easy-fixer:my-password@localhost:5433/easy-fixer-db" \nPORT=4000
`;

const WEB_ENV_CONTENT = `API_URL="http://localhost:4000/api/v1" \nPORT=3000
`;

/**
 * Main function to create environment files
 */
const main = async () => {
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

    console.log("\n🎉 Environment setup complete!");
  } catch (error) {
    console.error("Error setting up environment files:", error);
    process.exit(1);
  }
};

/**
 * Create an .env file in the specified directory with the given content
 */
const createEnvFile = async (directory, content) => {
  const envFilePath = path.join(directory, ".env");

  try {
    // Check if directory exists
    await fs.access(directory);
  } catch {
    console.log(`Creating directory: ${directory}`);
    await fs.mkdir(directory, { recursive: true });
  }

  // Check if file already exists
  try {
    await fs.access(envFilePath);

    // Read existing file content and compare
    const existingContent = await fs.readFile(envFilePath, "utf8");
    if (existingContent === content) {
      console.log(`ℹ️  .env file already up-to-date. Skipping: ${envFilePath}`);
      return;
    }

    // Content is different, back up existing file
    const backupPath = `${envFilePath}.backup.${Date.now()}`;
    await fs.copyFile(envFilePath, backupPath);
    console.log(`⚠️  Existing .env file backed up to ${backupPath}`);
  } catch (error) {
    // File doesn't exist, which is fine
    if (error.code !== "ENOENT") {
      throw error; // Rethrow if it's not a "file not found" error
    }
  }

  // Write the new .env file
  await fs.writeFile(envFilePath, content, "utf8");
  console.log(`✅ Created ${envFilePath}`);
};

// Run the script
main();
