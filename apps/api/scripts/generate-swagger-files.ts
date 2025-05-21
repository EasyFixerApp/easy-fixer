import config from "#config";
import { logger, openApiBuilder } from "#lib";
import fs from "fs";

import "../src/config/registry.js";

import path from "path";

const { files } = config.oas.provide;

// Create directory if it doesn't exist
const outputDir = path.resolve(files.dir);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Formats JSON content with proper indentation
 */
const formatJsonContent = (content: string): string => {
  try {
    const parsed = JSON.parse(content) as Record<string, unknown>;
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    logger.error("Error formatting JSON content:", error);
    return content; // Return original content if parsing fails
  }
};

/**
 * Normalizes JSON content for comparison by removing formatting differences
 */
const normalizeJsonForComparison = (content: string): string => {
  try {
    return JSON.stringify(JSON.parse(content));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // If parsing fails, fallback to stripping whitespace
    return content.replace(/\s+/g, "");
  }
};

// Generate JSON file
if (files.json.create) {
  logger.info(`Generating OpenAPI Specification JSON file...`);
  const jsonFilePath = path.join(outputDir, files.json.filename);
  const rawJsonContent = openApiBuilder.getSpecAsJson();
  const formattedJsonContent = formatJsonContent(rawJsonContent);

  if (fs.existsSync(jsonFilePath)) {
    const existingContent = fs.readFileSync(jsonFilePath, "utf8");
    if (
      normalizeJsonForComparison(existingContent) ===
      normalizeJsonForComparison(formattedJsonContent)
    ) {
      logger.info(`ℹ️ JSON file already up-to-date. Skipping: ${jsonFilePath}`);
    } else {
      fs.writeFileSync(jsonFilePath, formattedJsonContent);
      logger.info(`✅ Updated ${jsonFilePath}`);
    }
  } else {
    fs.writeFileSync(jsonFilePath, formattedJsonContent);
    logger.info(`✅ Created ${jsonFilePath}`);
  }
}

// Generate YAML file
if (files.yaml.create) {
  logger.info(`Generating OpenAPI Specification YAML file...`);
  const yamlFilePath = path.join(outputDir, files.yaml.filename);
  const newYamlContent = openApiBuilder.getSpecAsYaml();

  if (fs.existsSync(yamlFilePath)) {
    const existingContent = fs.readFileSync(yamlFilePath, "utf8");
    // For YAML, we do direct string comparison as it's already formatted
    if (existingContent === newYamlContent) {
      logger.info(`ℹ️ YAML file already up-to-date. Skipping: ${yamlFilePath}`);
    } else {
      fs.writeFileSync(yamlFilePath, newYamlContent);
      logger.info(`✅ Updated ${yamlFilePath}`);
    }
  } else {
    fs.writeFileSync(yamlFilePath, newYamlContent);
    logger.info(`✅ Created ${yamlFilePath}`);
  }
}
