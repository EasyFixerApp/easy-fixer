import config from "#config";
import { logger, prisma } from "#lib";
import { retry } from "#utils";
import { promisify } from "node:util";

import app from "./app.js";

const { HOST, LOG_LEVEL, NODE_ENV, PORT } = config.env;
const { path, serve } = config.oas.provide.ui;

logger.info("Starting server...");
logger.info(`NODE_ENV: ${NODE_ENV} LOG_LEVEL: ${LOG_LEVEL}`);

const onListen = () => {
  logger.info(
    `✅ Server listening on port ${PORT} ${NODE_ENV === "development" ? `at http://${HOST}:${PORT}` : ""}`,
  );
  if (serve)
    logger.info(`✅ Swagger UI available at http://${HOST}:${PORT}${path}`);
};

const server = app.listen(PORT, onListen);

// log uncaught exceptions and unhandled rejections
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

let isShuttingDown = false;

shutdownEvents.forEach((event) => {
  process.on(event, () => {
    if (isShuttingDown) {
      logger.error(`Received ${event}, but shutdown already in progress...`);
      return;
    }

    logger.warn(`Received ${event}, shutting down gracefully...`);
    isShuttingDown = true;
    gracefulShutdown();
  });
});

function gracefulShutdown() {
  logger.warn("Graceful shutdown initiated");

  const timeoutId = setTimeout(() => {
    logger.error("Graceful shutdown timed out after 10 seconds, forcing exit");
    process.exit(1);
  }, 10000); // Force exit after 10 seconds

  void (async () => {
    try {
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

      logger.warn("Graceful shutdown completed");

      // Exit with appropriate code
      process.exit(0);
    } catch (err) {
      logger.error("Error during graceful shutdown:", err);
      clearTimeout(timeoutId);
      process.exit(1);
    }
  })();
}
