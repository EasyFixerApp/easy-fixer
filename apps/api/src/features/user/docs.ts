import { openApiBuilder, zodToOpenApi } from "#lib";
import { createResponseZodSchema } from "#utils";

import { createdUser, userCreateInput } from "./model.js";

const userCreateRequest = zodToOpenApi(userCreateInput);
userCreateRequest.description = "Required data to create a user";
userCreateRequest.example = {
  email: "ha@ho.com",
  name: "Test User",
};

const userCreateResponse = zodToOpenApi(createResponseZodSchema(createdUser));
userCreateResponse.description = "User created successfully";
userCreateResponse.example = {
  data: {
    email: "ha@ho.com",
    id: 1,
    name: "Test User",
  },
  message: "Created",
  success: true,
};

openApiBuilder.addSchema("UserCreateRequest", userCreateRequest);
openApiBuilder.addSchema("UserCreateResponse", userCreateResponse);
