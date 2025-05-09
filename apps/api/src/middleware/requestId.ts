import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

// Augment the Express Request interface
declare module "express" {
  interface Request {
    id: string;
  }
}

/**
 * Middleware that adds a unique ID to each request.
 */
const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.id = uuidv4();
  res.setHeader("X-Request-ID", req.id);
  next();
};

export default requestIdMiddleware;
