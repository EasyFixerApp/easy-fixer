#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import os from "os";

const VERSION = "ef.1.0.0";

// Define aliases and corresponding directories
const aliases = {
  "go-root": "",
  "go-api": "apps/api",
  "go-web": "apps/web",
  // * Add more aliases here as needed
};

/**
 * Main function that orchestrates the setup process
 */
const main = async () => {
  console.log("Setting up Easy Fixer navigation shortcuts...");
  const projectRoot = determineProjectRoot();
  const shellConfigFile = determineShellConfigFile();
  const configBlock = generateConfigBlock(projectRoot);

  await updateShellConfig(shellConfigFile, configBlock);
  displayInstructions(shellConfigFile);
};

/**
 * Determine the project root directory
 */
const determineProjectRoot = () => {
  return process.cwd();
};

/**
 * Determine which shell configuration file to modify
 */
const determineShellConfigFile = () => {
  const homeDir = os.homedir();
  const shell = process.env.SHELL || "";

  if (shell.includes("zsh")) {
    return path.join(homeDir, ".zshrc");
  }

  if (shell.includes("bash")) {
    // Try bash_profile first, fall back to bashrc
    const bashProfile = path.join(homeDir, ".bash_profile");
    try {
      fs.accessSync(bashProfile);
      return bashProfile;
    } catch {
      return path.join(homeDir, ".bashrc");
    }
  }

  return path.join(homeDir, ".profile");
};

/**
 * Generate the complete configuration block to add to shell config
 */
const generateConfigBlock = (projectRoot) => {
  return `
# Start of Easy Fixer Navigation Shortcuts ${VERSION}
# This block was added by the Easy Fixer setup script
# You can remove it if you no longer need these shortcuts
# Added: ${new Date().toISOString()}

export EASY_FIXER_ROOT="${projectRoot}"

${Object.entries(aliases).reduce(
  (acc, [alias, directory]) =>
    acc +
    `
      ${alias}() {
        cd "$EASY_FIXER_ROOT/${directory}"
      }
    `,
  "",
)}

# End of Easy Fixer navigation shortcuts
`;
};

/**
 * Update the shell configuration file if needed
 */
const updateShellConfig = async (shellConfigFile, configBlock) => {
  try {
    const currentConfig = await fs.readFile(shellConfigFile, "utf8");
    const exists = currentConfig.includes("Easy Fixer Navigation Shortcuts");
    const sameVersion = currentConfig.includes(VERSION);
    const sameRoot = currentConfig.includes(
      `export EASY_FIXER_ROOT="${determineProjectRoot()}"`,
    );

    // Check if config already exists
    if (exists && sameVersion && sameRoot) {
      console.log(`\n✅ Configuration already exists in ${shellConfigFile}`);
      return;
    }

    // Check if config exists but is outdated and delete it
    if (exists && (!sameVersion || !sameRoot)) {
      console.log(
        `\n⚠️  Configuration already exists in ${shellConfigFile}, but is outdated.`,
      );
      console.log(
        `\n⚠️  Removing outdated configuration from ${shellConfigFile}...`,
      );

      // Remove the outdated block
      const startSignature = "# Start of Easy Fixer Navigation Shortcuts";
      const endSignature = "# End of Easy Fixer navigation shortcuts";
      const start = currentConfig.indexOf(startSignature);
      const end = currentConfig.indexOf(endSignature) + endSignature.length;

      if (start === -1 || end === -1) {
        throw new Error(
          `Error: Could not find the configuration block in ${shellConfigFile}`,
        );
      }

      // Remove the outdated block
      const newConfig =
        currentConfig.slice(0, start) + currentConfig.slice(end);
      await fs.writeFile(shellConfigFile, newConfig, "utf8");
      console.log(
        `\n✅ Removed outdated configuration from ${shellConfigFile}`,
      );
    }
    // Append configuration
    await fs.appendFile(shellConfigFile, configBlock, "utf8");
    console.log(`\n✅ Added configuration to ${shellConfigFile}`);
  } catch (err) {
    console.error(`Error modifying ${shellConfigFile}:`, err);
    process.exit(1);
  }
};

/**
 * Display usage instructions after setup
 */
const displayInstructions = (shellConfigFile) => {
  console.log("\n🚀 You can now use these commands from anywhere:\n");

  // Dynamically list available commands
  const projectRoot = determineProjectRoot();
  Object.entries(aliases).forEach(([alias, directory]) => {
    const relativePath =
      directory === "" ? "project root" : path.relative(projectRoot, directory);
    const sizedAlias = alias.padEnd(10, " ");
    console.log(`    ${sizedAlias}  - Navigate to ${relativePath}`);
  });

  console.log(
    `\nIf commands don't work immediately, please restart your terminal or run: \nsource ${shellConfigFile}\n`,
  );
};

// Execute the main function
main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
