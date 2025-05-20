import { beforeEach, describe, expect, it, vi } from "vitest";

// Create mock for healthRepo before importing the service
vi.mock("../../../../../src/features/health/repo.js", () => {
  return {
    default: {
      checkDatabaseConnection: vi.fn(),
      checkWriteDelete: vi.fn(),
    },
  };
});

// Import after mocking
import healthRepo from "../../../../../src/features/health/repo.js";
import { healthService } from "../../../../../src/features/health/service.js";

describe("healthService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("checkHealth", () => {
    it("should return true when database connection is successful", async () => {
      // Arrange
      vi.mocked(healthRepo.checkDatabaseConnection).mockResolvedValue(true);

      // Act
      const result = await healthService.checkHealth();

      // Assert
      expect(healthRepo.checkDatabaseConnection).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    it("should propagate any errors from the repository", async () => {
      // Arrange
      const testError = new Error("Database connection failed");
      vi.mocked(healthRepo.checkDatabaseConnection).mockRejectedValue(
        testError,
      );

      // Act & Assert
      await expect(healthService.checkHealth()).rejects.toThrow(testError);
      expect(healthRepo.checkDatabaseConnection).toHaveBeenCalledTimes(1);
    });
  });

  describe("checkWriteDelete", () => {
    it("should call repo with correct data and return result", async () => {
      // Arrange
      const testData = { email: "test@example.com" };
      const expectedResult = {
        email: "test@example.com",
        id: 1,
        timestamp: new Date(),
      };
      vi.mocked(healthRepo.checkWriteDelete).mockResolvedValue(expectedResult);

      // Act
      const result = await healthService.checkWriteDelete(testData);

      // Assert
      expect(healthRepo.checkWriteDelete).toHaveBeenCalledWith(testData);
      expect(result).toEqual(expectedResult);
    });

    it("should propagate any errors from the repository", async () => {
      // Arrange
      const testData = { email: "test@example.com" };
      const testError = new Error("Write/delete operation failed");
      vi.mocked(healthRepo.checkWriteDelete).mockRejectedValue(testError);

      // Act & Assert
      await expect(healthService.checkWriteDelete(testData)).rejects.toThrow(
        testError,
      );
      expect(healthRepo.checkWriteDelete).toHaveBeenCalledWith(testData);
    });
  });
});
