import { logger, prisma } from "#lib";
import { retry } from "#utils";
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

// ...existing code...

function gracefulShutdown() {
  logger.info("Graceful shutdown initiated");

  const timeoutId = setTimeout(() => {
    logger.error("Graceful shutdown timed out after 10 seconds, forcing exit");
    process.exit(1);
  }, 10000); // Force exit after 10 seconds

  (async () => {
    // Close database connection
    await retry({
      fn: prisma.$disconnect.bind(prisma),
      label: "prisma.$disconnect",
      retries: 1,
    });
    logger.info("Database disconnected successfully");

    // Close HTTP server (stops accepting new requests)
    await retry({
      fn: promisify(server.close.bind(server)),
      label: "server.close",
      retries: 1,
    });
    logger.info("HTTP server closed successfully");

    // Clear the forced timeout
    clearTimeout(timeoutId);

    // Exit with appropriate code
    process.exit(0);
  })().catch((err: unknown) => {
    logger.error("Error during graceful shutdown:", err);
    clearTimeout(timeoutId);
    process.exit(1);
  });
  logger.info("Graceful shutdown completed");
}
