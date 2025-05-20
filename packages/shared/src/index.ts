export * from "./zSchema/index.js";
export * from "./utils/index.js";

export type * from "./types/index.js";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: unknown;
  message: string;
  success: boolean;
}
