import { NotFoundError } from "#lib";
import { RequestHandler } from "express";

/**
 * Middleware that handles 404 errors for routes that are not found.
 */
export const routeNotFoundHandler: RequestHandler = (req, res, next) => {
  const error = new NotFoundError(
    `Route not found: ${req.method} ${req.originalUrl}`,
  );

  next(error);
};
