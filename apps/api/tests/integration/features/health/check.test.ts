import { StatusCodes } from "http-status-codes";

import { api } from "../../../helpers/api.js";

describe("Health Check Endpoint", () => {
  it("should return 200 and database status", async () => {
    // Execute
    const response = await api.get("/health/check");

    // Assert
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toMatchObject({
      data: {
        db: "up",
      },
      message: "The server is healthy. Database info is on property `db`.",
      success: true,
    });
  });
});
