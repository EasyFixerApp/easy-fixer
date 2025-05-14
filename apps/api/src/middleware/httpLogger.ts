import { logger } from "#lib";
import { Request } from "express";
import morgan from "morgan";

/**
 * Interface for log entry data
 */
interface LogEntryData {
  content_length: string | undefined;
  content_type: string | undefined;
  http_version: string | undefined;
  id: string | undefined;
  method: string | undefined;
  referrer: string | undefined;
  remote_addr: string | undefined;
  request_body_size: string | undefined;
  response_time: string;
  status: string | undefined;
  timestamp: string;
  url: string | undefined;
  url_query: string | undefined;
  user_agent: string | undefined;
}

/**
 * Stream handler for morgan logs.
 */
const logStream = {
  write: (message: string) => {
    try {
      const data = JSON.parse(message) as LogEntryData;

      const { http_version, id, method, response_time, status, url } = data;
      if (url?.includes("/api-docs/swagger")) return;

      const logMessage = `[${id}] ${method} ${url} HTTP/${http_version} status: ${status} duration: ${response_time}`;

      if (status?.startsWith("4")) logger.warn(logMessage);
      else if (status?.startsWith("5")) logger.error(logMessage);
      else logger.http(logMessage);

      logger.debug(logMessage, data);
    } catch (error) {
      logger.http(
        `failed to parse and format log message for HTTP request: ${String(error)}`,
      );
    }
  },
};

morgan.token("request-id", (req: Request) => req.id);

/**
 * Custom Morgan logger middleware.
 */
export const httpLogger = morgan(
  (tokens, req, res) => {
    const logEntryData: LogEntryData = {
      content_length: tokens.res(req, res, "content-length"),
      content_type: tokens.res(req, res, "content-type"),
      http_version: tokens["http-version"](req, res),
      id: tokens["request-id"](req, res),
      method: tokens.method(req, res),
      referrer: tokens.referrer(req, res),
      remote_addr: tokens["remote-addr"](req, res),
      request_body_size: tokens.req(req, res, "content-length"),
      response_time: tokens["response-time"](req, res)
        ? `${tokens["response-time"](req, res)} ms`
        : "0 ms",
      status: tokens.status(req, res),
      timestamp: new Date().toISOString(),
      url: tokens.url(req, res),
      url_query: req.url?.includes("?") ? req.url.split("?")[1] : undefined,
      user_agent: tokens["user-agent"](req, res),
    };
    return JSON.stringify(logEntryData);
  },
  { stream: logStream },
);
