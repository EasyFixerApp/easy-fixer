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
  // Determine if this is one of our custom application errors
  const isAppError = err instanceof AppError;

  // Extract error details based on error type
  const statusCode = isAppError
    ? err.statusCode
    : StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
  const isOperational = isAppError ? err.isOperational : false;

  // * Log with request ID for traceability
  const errorTracingDetails = {
    id: req.id,
    isOperational,
    method: req.method,
    path: req.path,
    // eslint-disable-next-line perfectionist/sort-objects
    err,
  };

  if (isAppError && isOperational) {
    logger.warn(`[${req.id}] ${message}`);
    logger.debug(message, errorTracingDetails);
  } else logger.error(message, errorTracingDetails);

  // Construct response object
  const response: ApiResponse = {
    message: "",
    success: false,
  };
  // For security, don't expose error details in production
  response.message = isOperational
    ? isAppError && err.clientMessage
      ? err.clientMessage
      : message
    : `${ReasonPhrases.INTERNAL_SERVER_ERROR} - Something went wrong. Try again later or contact support using trace ID: ${req.id}`;

  // * Add additional error info if appropriate
  if (isOperational && isAppError && err.info) {
    response.error = err.info.issues;
  }

  // Send response
  res.status(statusCode).json(response);
};
