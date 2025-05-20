import { describe, it, expect, vi, beforeEach } from "vitest";
import { healthService } from "../src/services/api/health";
import apiClient from "../src/lib/axios";

vi.mock("../src/lib/axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe("Health Service", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should correctly call the health check endpoint", async () => {
    const mockResponse = {
      status: 200,
      data: {
        data: { db: "up" },
        message: "The server is healthy",
        success: true,
      },
    };

    vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

    const result = await healthService.check();

    expect(apiClient.get).toHaveBeenCalledWith("/health/check");
    expect(result).toEqual(mockResponse.data);
  });

  it("should correctly call the health write-delete endpoint", async () => {
    const testData = { email: "test@example.com" };
    const mockResponse = {
      data: {
        data: {
          id: 1,
          email: "test@example.com",
          timeStamp: "2023-01-01T00:00:00.000Z",
        },
        message: "Database write and delete operations successful",
        success: true,
      },
    };

    vi.mocked(apiClient.post).mockResolvedValueOnce(mockResponse);

    const result = await healthService.create(testData);

    expect(apiClient.post).toHaveBeenCalledWith(
      "/health/write-delete",
      testData,
    );
    expect(result).toEqual(mockResponse.data);
  });
});
