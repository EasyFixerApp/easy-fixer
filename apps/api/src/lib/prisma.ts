import config from "#config";
import { logger } from "#lib";

import {
  PrismaClient,
  Prisma as PrismaNamespace,
} from "../generated/prisma/index.js";

// ? prisma has log levels: error, warn, info, query
// ? log are emitted as events to log them again using the app logger

export { PrismaNamespace as Prisma };
export const prisma = new PrismaClient({
  datasourceUrl: config.env.DATABASE_URL,
  errorFormat: "pretty",
  log: [
    { emit: "event", level: "warn" },
    { emit: "event", level: "info" },
    { emit: "event", level: "query" },
  ],
});

// error is logged by the app logger through the error handler !Do NOT log it again here
const prismaEvents = ["warn", "info"] as const;

prismaEvents.forEach((event) => {
  prisma.$on(event, (e) => {
    const message = `Prisma ${event}: ${e.message}`;
    logger[event](message);
  });
});

prisma.$on("query", (e) => {
  // other properties: e.timestamp, e.target, e.params, e.duration

  const toLog = e.query
    .replace(/"/g, "")
    .trim()
    .replace(
      /\b(SELECT|FROM|WHERE|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|OUTER JOIN|GROUP BY|ORDER BY|HAVING|LIMIT|OFFSET|UPDATE|DELETE|INSERT INTO|VALUES|SET|RETURNING)\b/gi,
      "\n  $1",
    );

  logger.debug(toLog);
});
