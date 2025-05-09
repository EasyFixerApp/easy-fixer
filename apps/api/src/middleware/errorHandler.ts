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
  logger.error(`[${req.id}] ${message}`, {
    error: err.stack,
    isOperational,
    method: req.method,
    path: req.path,
  });

  // For security, don't expose error details in production
  const responseMessage =
    process.env.NODE_ENV === "production" && !isOperational
      ? ReasonPhrases.INTERNAL_SERVER_ERROR
      : message;

  res.status(statusCode).json({
    message: responseMessage,
    requestId: req.id,
    success: false,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
