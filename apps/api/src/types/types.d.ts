import "express";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }

  interface ApiResponse<T = unknown> {
    data?: T;
    error?: object | string;
    message: string;
    success: boolean;
  }

  type SuccessResponse<T> = Omit<ApiResponse<T>, "error" | "success">;
}

export {};
