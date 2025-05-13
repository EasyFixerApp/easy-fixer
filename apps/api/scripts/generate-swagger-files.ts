import config from "#config";
import { logger, openApiBuilder } from "#lib";
import fs from "fs";

import "../src/config/registry.js";

import path from "path";

const { files } = config.oas.provide;

// Create directory if it doesn't exist
const outputDir = path.resolve(files.outputDir);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate JSON file
if (files.json.create) {
  fs.writeFileSync(
    path.join(outputDir, files.json.filename),
    openApiBuilder.getSpecAsJson(),
  );
  logger.info(`✅ ${outputDir}/${files.json.filename}`);
}

// Generate YAML file
if (files.yaml.create) {
  fs.writeFileSync(
    path.join(outputDir, files.yaml.filename),
    openApiBuilder.getSpecAsYaml(),
  );
  logger.info(`✅ ${outputDir}/${files.yaml.filename}`);
}
