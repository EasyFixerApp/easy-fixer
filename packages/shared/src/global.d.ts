import {
  Prettify as PrettifyOriginal,
  ApiResponse as ApiResponseOriginal,
} from "./types.js";

declare global {
  type Prettify<T> = PrettifyOriginal<T>;
  interface ApiResponse<T> extends ApiResponseOriginal<T> {}
}

// No exports needed from this file
export {};
