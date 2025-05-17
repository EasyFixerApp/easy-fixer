declare global {
  interface ApiResponse<T = unknown> {
    data?: T;
    error?: unknown;
    message: string;
    success: boolean;
  }
}

export {};
