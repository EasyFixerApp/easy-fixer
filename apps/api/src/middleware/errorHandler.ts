import config from "#config";
import { AppError } from "#lib";
import { logger } from "#lib";
import { ErrorRequestHandler } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const errorHandler: ErrorRequestHandler = (
  err: AppError | Error,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next,
) => {
  // Default values
  const statusCode =
    "statusCode" in err ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
  const isOperational = "isOperational" in err ? err.isOperational : false;
  // Log with request ID for traceability
  logger.error(message, {
    error: config.env.LOG_LEVEL === "debug" ? err.stack : undefined,
    id: req.id,
    isOperational,
    method: req.method,
    path: req.path,
  });

  // For security, don't expose error details in production
  const responseMessage = isOperational
    ? message
    : `${ReasonPhrases.INTERNAL_SERVER_ERROR} - Something went wrong. Try again later or contact support using trace ID: ${req.id}`;

  const response: ApiResponse = {
    error: isOperational ? err : undefined,
    message: responseMessage,
    success: false,
  };
  res.status(statusCode).json(response);
};
