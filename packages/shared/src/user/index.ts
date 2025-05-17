import { toCreate, created, CreateTypes } from "./create.js";

export const user = {
  toCreate,
  created,
};

export namespace User {
  export import Create = CreateTypes;
}
