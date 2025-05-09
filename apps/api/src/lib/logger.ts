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
            return `  ${key}: ${JSON.stringify(val, null, 2).replace(/\\/g, ``)}`;
          })
          .join("\n")
      : "";

    metaStr = metaStr.length > 0 ? "\n{" + metaStr + "\n}" : "";
    return `[${timestamp}] (${level}): ${message}${metaStr}`;
  }),
);

// Console log with readable format
const consoleTransport = new winston.transports.Console({
  format: readableFormat,
});

// Error logs with handling
const errorFileTransport = new DailyRotateFile({
  filename: "logs/error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "error",
  format: generalFormat,
  handleExceptions: true,
  handleRejections: true,
  maxSize: "5m",
  maxFiles: "14d",
  zippedArchive: true,
});

// Combined logs (http and above)
const combinedFileTransport = new DailyRotateFile({
  filename: "logs/combined-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "http",
  format: generalFormat,
  maxSize: "10m",
  maxFiles: "3d",
  zippedArchive: true,
});

// Debug logs
const debugFileTransport = new DailyRotateFile({
  filename: "logs/debug-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "debug",
  format: generalFormat,
  maxSize: "10m",
  maxFiles: "1d",
  zippedArchive: true,
});

// Create the logger
const logger = winston.createLogger({
  format: generalFormat,
  level: process.env.LOG_LEVEL ?? "http",
  transports: [
    consoleTransport,
    errorFileTransport,
    combinedFileTransport,
    debugFileTransport,
  ],
  exitOnError: false,
});

export default logger;
