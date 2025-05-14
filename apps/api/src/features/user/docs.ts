import { openApiBuilder, zodToOpenApi } from "#lib";
import { dataSchemaToOpenApiResponse } from "#utils";

import { createdUser, userCreateInput } from "./model.js";

const userCreateRequest = zodToOpenApi(userCreateInput);
userCreateRequest.description = "Required data to create a user";
userCreateRequest.example = {
  email: "ha@ho.com",
  name: "Test User",
};

const userCreateResponse = dataSchemaToOpenApiResponse({
  dataSchema: createdUser,
  description: "User created successfully",
  example: {
    email: "ha@ho.com",
    id: 1,
    name: "Test User",
  },
});

openApiBuilder.addSchema("UserCreateRequest", userCreateRequest);
openApiBuilder.addSchema("UserCreateResponse", userCreateResponse);
