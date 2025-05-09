import logger from "#lib/logger.js";
import prisma from "#lib/prisma.js";
import retry from "#utils/retry.js";
import { promisify } from "node:util";

import app from "./app.js";

const port = process.env.PORT ?? "9001";

const server = app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});

// Handle uncaught exceptions and unhandled rejections
process.on("uncaughtException", logger.error);
process.on("unhandledRejection", logger.error);

// Handle shutdown
const shutdownEvents: string[] = [
  "SIGTERM",
  "SIGINT",
  "SIGUSR2",
  "EXIT",
  "uncaughtException",
  "unhandledRejection",
];

shutdownEvents.forEach((event) => {
  process.on(event, () => {
    logger.info(`Received ${event}, shutting down gracefully...`);
    gracefulShutdown();
  });
});

function gracefulShutdown() {
  (async () => {
    //disconnect from the database
    await retry({
      fn: prisma.$disconnect.bind(prisma),
      label: "prisma.$disconnect",
    });

    //close the server
    await retry({
      fn: promisify(server.close.bind(server)),
      label: "server.close",
    });

    process.exit(0);
  })().catch((err: unknown) => {
    logger.error("Error during graceful shutdown:", err);
    process.exit(1);
  });
}
