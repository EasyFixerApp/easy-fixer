import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";

/**
 * Middleware that adds a unique ID to each request.
 */
export const requestIdGenerator: RequestHandler = (req, res, next) => {
  req.id = uuidv4();
  res.setHeader("X-Request-ID", req.id);
  next();
};
