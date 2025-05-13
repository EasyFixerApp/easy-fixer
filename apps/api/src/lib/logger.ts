import config from "#config";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// General format, easily parsable by log management systems
const generalFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

// This format is more human-readable and includes colors
const readableFormat = winston.format.combine(
  winston.format.timestamp({ format: "isoDateTime" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    let metaStr = Object.keys(meta).length
      ? "\n" +
        Object.entries(meta)
          .map(([key, val]) => {
            if (typeof val === "string" && val.includes("\n")) {
              return `${key}:\n${val}`;
            }
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            return `  ${key}: ${JSON.stringify(val, null, 2)?.replace(/\\/g, ``)}`;
          })
          .join("\n")
      : "";

    metaStr = metaStr.length > 0 ? "\n{" + metaStr + "\n}" : "";
    return `[${String(timestamp)}] (${level}): ${String(message)}${metaStr}`;
  }),
);

// Console log with readable format
const consoleTransport = new winston.transports.Console({
  format: readableFormat,
});

// Error logs with handling
const errorFileTransport = new DailyRotateFile({
  datePattern: "YYYY-MM-DD",
  filename: "logs/error-%DATE%.log",
  format: generalFormat,
  handleExceptions: true,
  handleRejections: true,
  level: "error",
  maxFiles: "14d",
  maxSize: "5m",
  zippedArchive: true,
});

// Combined logs (http and above)
const combinedFileTransport = new DailyRotateFile({
  datePattern: "YYYY-MM-DD",
  filename: "logs/combined-%DATE%.log",
  format: generalFormat,
  level: "http",
  maxFiles: "3d",
  maxSize: "10m",
  zippedArchive: true,
});

// Debug logs
const debugFileTransport = new DailyRotateFile({
  datePattern: "YYYY-MM-DD",
  filename: "logs/debug-%DATE%.log",
  format: generalFormat,
  level: "debug",
  maxFiles: "1d",
  maxSize: "10m",
  zippedArchive: true,
});

// Create the logger
export const logger = winston.createLogger({
  exitOnError: false,
  format: generalFormat,
  level: config.env.LOG_LEVEL,
  transports: [
    consoleTransport,
    errorFileTransport,
    combinedFileTransport,
    debugFileTransport,
  ],
});
