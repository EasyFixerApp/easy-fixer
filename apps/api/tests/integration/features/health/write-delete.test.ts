import { StatusCodes } from "http-status-codes";

import { api } from "../../../helpers/api.js";

describe("Health Write-Delete Endpoint", () => {
  it("should successfully create and delete a test record", async () => {
    // Arrange
    const testData = {
      email: "test@example.com",
    };

    // Execute
    const response = await api.post("/health/write-delete").send(testData);

    // Assert
    expect(response.status).toBe(StatusCodes.OK);

    expect(response.body).toMatchObject({
      data: {
        email: testData.email,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: expect.any(Number),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        timestamp: expect.any(String),
      },
      message: "Database write and delete operations successful",
      success: true,
    });
  });

  it("should return 400 for invalid email", async () => {
    // Arrange
    const invalidData = {
      email: "not-an-email",
    };

    // Execute
    const response = await api.post("/health/write-delete").send(invalidData);
    const responseBody = response.body as ApiResponse;

    // Assert
    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(responseBody.success).toBe(false);
  });

  it("should return 200 when email is missing", async () => {
    // Arrange
    const invalidData = {};

    // Execute
    const response = await api.post("/health/write-delete").send(invalidData);
    const responseBody = response.body as ApiResponse;

    // Assert
    expect(response.status).toBe(StatusCodes.OK);
    expect(responseBody.success).toBe(true);
  });
});
