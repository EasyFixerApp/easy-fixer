import { zodToOpenApi, zodToOpenApiSuccessResponse } from "#lib";
import { zSchema } from "easy-fixer-shared";

// Health check endpoint documentation
zodToOpenApiSuccessResponse({
  dataSchema: zSchema.health.checked,
  description: "Health check status",
  example: {
    db: "up",
  },
  name: "HealthCheckResponse",
});

// Health write-delete endpoint documentation
// Health write-delete request schema
zodToOpenApi({
  description: "Data required for health write-delete test",
  example: {
    email: "test@example.com",
  },
  name: "HealthWriteDeleteRequest",
  schema: zSchema.health.toCreate,
});

// Health write-delete response schema
zodToOpenApiSuccessResponse({
  dataSchema: zSchema.health.created,
  description: "Database write/delete operation status",
  example: {
    email: "test@example.com",
    id: 1,
    timeStamp: "2023-12-01T12:00:00.000Z",
  },
  name: "HealthWriteDeleteResponse",
});
