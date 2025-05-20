import "express";

/**
 * @description
 * This file contains global type definitions for the Express application.
 * ! If a type is used locally, it should be defined in the level where it is used.
 */

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }

  interface ApiResponse<T = unknown> {
    data?: T;
    error?: unknown;
    message: string;
    success: boolean;
  }

  type Prettify<T> = import("easy-fixer-shared").Prettify<T>;
}

export {};
