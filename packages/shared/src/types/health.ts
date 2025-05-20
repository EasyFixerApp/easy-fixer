import { toCreate, created, checked } from "../zSchema/health.js";
import z from "zod";

export namespace HealthTypes {
  export type CreateRequest = z.infer<typeof toCreate>;
  export type CreateResponse = ApiResponse<z.infer<typeof created>>;
  export type CheckResponse = ApiResponse<z.infer<typeof checked>>;
}
