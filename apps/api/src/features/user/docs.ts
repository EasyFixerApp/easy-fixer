import { zodToOpenApi, zodToOpenApiSuccessResponse } from "#lib";
import { user } from "easy-fixer-shared";

zodToOpenApi({
  description: "Required data to create a user",
  example: {
    email: "ha@ho.com",
    name: "Test User",
  },
  name: "UserCreateRequest",
  schema: user.toCreate.schema,
});

zodToOpenApiSuccessResponse({
  dataSchema: user.created.schema,
  description: "User created successfully",
  example: {
    email: "ha@ho.com",
    id: 1,
    name: "Test User",
  },
  name: "UserCreateResponse",
});
