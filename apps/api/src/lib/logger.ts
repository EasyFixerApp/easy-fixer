import config from "#config";
import util from "util";
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
            return `  ${key}: ${util.inspect(val, { colors: true, depth: null })}`;
          })
          .join("\n")
      : "";

    metaStr = metaStr.length > 0 ? "\n{" + metaStr + "\n}" : "";
    return `[${String(timestamp)}] (${level}): ${String(message)}${metaStr}`;
  }),
);

// Log to console
const consoleTransport = new winston.transports.Console({
  format: readableFormat,
});

// Log to a file: error level
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

// Log to a file: http level
const httpFileTransport = new DailyRotateFile({
  datePattern: "YYYY-MM-DD",
  filename: "logs/http-%DATE%.log",
  format: generalFormat,
  level: "http",
  maxFiles: "3d",
  maxSize: "10m",
  zippedArchive: true,
});

// Log to a file: debug level
const debugFileTransport = new DailyRotateFile({
  datePattern: "YYYY-MM-DD",
  filename: "logs/debug-%DATE%.log",
  format: generalFormat,
  level: "debug",
  maxFiles: "1d",
  maxSize: "10m",
  zippedArchive: true,
});

// Logger instance
export const logger = winston.createLogger({
  exitOnError: false,
  format: generalFormat,
  level: config.env.LOG_LEVEL, // used in transports where level is not set
  transports: [
    consoleTransport,
    errorFileTransport,
    httpFileTransport,
    debugFileTransport,
  ],
});
