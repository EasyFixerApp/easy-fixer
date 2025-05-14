#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";

const API_ENV_CONTENT = `DATABASE_URL="postgresql://easy-fixer:my-password@localhost:5433/easy-fixer-db"
`;

const WEB_ENV_CONTENT = `# Web app environment variables
`;

/**
 * Main function to create environment files
 */
const main = async () => {
  console.log("Setting up environment files for Easy Fixer apps...");

  try {
    const projectRoot = process.cwd();
    const apiDir = path.join(projectRoot, "apps/api");
    const webDir = path.join(projectRoot, "apps/web");

    // Create API .env file
    await createEnvFile(apiDir, API_ENV_CONTENT);
    console.log("✅ Created .env file in API directory");

    // Create Web .env file
    await createEnvFile(webDir, WEB_ENV_CONTENT);
    console.log("✅ Created .env file in Web directory");

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
    // Back up existing file
    const backupPath = `${envFilePath}.backup.${Date.now()}`;
    await fs.copyFile(envFilePath, backupPath);
    console.log(`⚠️  Existing .env file backed up to ${backupPath}`);
  } catch {
    // File doesn't exist, which is fine
  }

  // Write the new .env file
  await fs.writeFile(envFilePath, content, "utf8");
};

// Run the script
main();
