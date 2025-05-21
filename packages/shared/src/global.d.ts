import { Prettify as PrettifyOriginal } from "./index.js";

declare global {
  type Prettify<T> = PrettifyOriginal<T>;
  export interface ApiResponse<T = unknown> {
    data?: T;
    error?: unknown;
    message: string;
    success: boolean;
  }
}

export {};
