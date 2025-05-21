export * as zSchema from "./zSchema/index.js";
export * from "./utils/index.js";
export type * as Types from "./types/index.js";
export type * from "./global.js";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
