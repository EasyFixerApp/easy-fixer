import {
  Prettify as PrettifyOriginal,
  ApiResponse as ApiResponseOriginal,
} from "./index.js";

declare global {
  type Prettify<T> = PrettifyOriginal<T>;
  interface ApiResponse<T> extends ApiResponseOriginal<T> {}
}

export {};
