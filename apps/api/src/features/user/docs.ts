import { openApiBuilder, zodToOpenApi } from "#lib";
import { dataSchemaToOpenApiResponse } from "#utils";
import { user } from "easy-fixer-shared";

const userCreateRequest = zodToOpenApi(user.toCreate.schema);
userCreateRequest.description = "Required data to create a user";
userCreateRequest.example = {
  email: "ha@ho.com",
  name: "Test User",
};

const userCreateResponse = dataSchemaToOpenApiResponse({
  dataSchema: user.created.schema,
  description: "User created successfully",
  example: {
    email: "ha@ho.com",
    id: 1,
    name: "Test User",
  },
});

openApiBuilder.addSchema("UserCreateRequest", userCreateRequest);
openApiBuilder.addSchema("UserCreateResponse", userCreateResponse);
