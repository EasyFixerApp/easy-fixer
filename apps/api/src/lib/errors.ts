import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class AppError extends Error {
  isOperational: boolean; // Operational errors are expected and can be handled
  statusCode: StatusCodes;

  constructor(message: string, statusCode: StatusCodes, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational; // Helps distinguish between operational vs programmer errors
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = ReasonPhrases.BAD_REQUEST) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class DuplicateError extends AppError {
  constructor(message: string = ReasonPhrases.CONFLICT) {
    super(message, StatusCodes.CONFLICT);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = ReasonPhrases.NOT_FOUND) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = ReasonPhrases.UNAUTHORIZED) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
