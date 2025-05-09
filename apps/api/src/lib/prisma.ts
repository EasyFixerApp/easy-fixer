import logger from "#lib/logger.js";

import { PrismaClient } from "../generated/prisma/index.js";

// ? prisma has log levels: error, warn, info, query
// ? log events are emitted to log them again using the app logger

const prisma = new PrismaClient({
  log: [
    { emit: "event", level: "error" },
    { emit: "event", level: "warn" },
    { emit: "event", level: "info" },
    { emit: "event", level: "query" },
  ],
});

const prismaEvents = ["error", "warn", "info"] as const;

prismaEvents.forEach((event) => {
  prisma.$on(event, (e) => {
    logger[event](`Prisma ${event}: ${e.message}`);
  });
});

prisma.$on("query", (e) => {
  // ? as needed you can add: e.timestamp, e.target, e.params, e.duration or the full e object
  const toLog = {
    query: e.query
      .replace(/"/g, "")
      .trim()
      .replace(
        /\b(SELECT|FROM|WHERE|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|OUTER JOIN|GROUP BY|ORDER BY|HAVING|LIMIT|OFFSET|UPDATE|DELETE|INSERT INTO|VALUES|SET)\b/gi,
        "\n  $1",
      ),
  };
  logger.debug("Prisma query:", toLog);
});

export default prisma;
