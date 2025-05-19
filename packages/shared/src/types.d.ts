declare global {
  interface ApiResponse<T = unknown> {
    data?: T;
    error?: unknown;
    message: string;
    success: boolean;
  }

  type Prettify<T> = {
    [K in keyof T]: T[K];
  } & {};
}

export {};
