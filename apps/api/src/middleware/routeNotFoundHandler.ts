import { NotFoundError } from "#lib";
import { RequestHandler } from "express";

export const routeNotFoundHandler: RequestHandler = (req, res, next) => {
  const error = new NotFoundError(
    `Route not found: ${req.method} ${req.originalUrl}`,
  );

  next(error);
};
