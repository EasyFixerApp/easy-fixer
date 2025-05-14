import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

/**
 * @description
 * This file is responsible for defining all the custom errors used in the application
 * The errors should be sorted alphabetically, if long, create errors/index.ts and custom errors in separate files
 * ! Each error should extend the base AppError class
 */

/**
 * Base error class for the application
 * Extends the native Error class with additional properties specific to API responses
 */
class AppError extends Error {
  clientMessage?; // Optional client-facing message especially if the <message> includes sensitive information
  info?; // Optional additional information object
  isOperational; // Operational errors are expected and can be handled, Helps distinguish between operational vs programmer errors
  statusCode; // HTTP status code for the error

  constructor(
    message: string,
    statusCode: StatusCodes,
    isOperational = true,
    clientMessage?: string,
    info?: Record<string, unknown> | ZodError,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.clientMessage = clientMessage;
    this.info = info; // Store additional information if provided
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error for malformed requests (HTTP 400)
 * Used when the request contains invalid parameters or payload
 */
class BadRequestError extends AppError {
  constructor(
    message: string = ReasonPhrases.BAD_REQUEST,
    info?: ZodError,
    clientMessage?: string,
  ) {
    super(message, StatusCodes.BAD_REQUEST, true, clientMessage, info);
  }
}

/**
 * Error for duplicate resource conflicts (HTTP 409)
 * Used when a resource already exists or conflicts with another resource
 */
class DuplicateError extends AppError {
  constructor(
    message: string = ReasonPhrases.CONFLICT,
    clientMessage?: string,
  ) {
    super(message, StatusCodes.CONFLICT, true, clientMessage);
  }
}

/**
 * Error for authorization failures (HTTP 403)
 * Used when a user is authenticated but doesn't have permission to access a resource
 */
class ForbiddenError extends AppError {
  constructor(
    message: string = ReasonPhrases.FORBIDDEN,
    clientMessage?: string,
  ) {
    super(message, StatusCodes.FORBIDDEN, true, clientMessage);
  }
}

/**
 * Error for server-side errors (HTTP 500)
 * Used for unexpected errors that occur during request processing
 */
class InternalServerError extends AppError {
  constructor(
    message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    clientMessage?: string,
  ) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR, false, clientMessage);
  }
}

/**
 * Error for unsupported HTTP methods (HTTP 405)
 * Used when a request method is not supported for a particular resource
 */
class MethodNotAllowedError extends AppError {
  constructor(
    message: string = ReasonPhrases.METHOD_NOT_ALLOWED,
    clientMessage?: string,
  ) {
    super(message, StatusCodes.METHOD_NOT_ALLOWED, true, clientMessage);
  }
}

/**
 * Error for resource not found situations (HTTP 404)
 * Used when a requested resource does not exist
 */
class NotFoundError extends AppError {
  constructor(
    message: string = ReasonPhrases.NOT_FOUND,
    clientMessage?: string,
  ) {
    super(message, StatusCodes.NOT_FOUND, true, clientMessage);
  }
}

/**
 * Error for authentication failures (HTTP 401)
 * Used when a user is not authenticated or credentials are invalid
 */
class UnauthorizedError extends AppError {
  constructor(
    message: string = ReasonPhrases.UNAUTHORIZED,
    clientMessage?: string,
  ) {
    super(message, StatusCodes.UNAUTHORIZED, true, clientMessage);
  }
}

/**
 * Error for validation failures
 * A specialized form of BadRequestError specifically for data validation issues
 */
class ValidationError extends BadRequestError {
  constructor(info?: ZodError, range = "Request Body", clientMessage?: string) {
    const message = `Validation Error in: ${range}`;
    super(message, info, clientMessage);
  }
}

// Export all error classes
export {
  AppError,
  BadRequestError,
  DuplicateError,
  ForbiddenError,
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
};
