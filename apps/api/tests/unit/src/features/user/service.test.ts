import { beforeEach, describe, expect, it, vi } from "vitest";

// Create a mock for the userRepo - IMPORTANT: This must come before any imports that use it
vi.mock("../../../../../src/features/user/repo.js", () => {
  return {
    default: {
      create: vi.fn(),
      existByEmail: vi.fn(),
    },
  };
});

// Import modules after mocking
import { DuplicateError } from "#lib";

import userRepo from "../../../../../src/features/user/repo.js";
import { userService } from "../../../../../src/features/user/service.js";

describe("userService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a user successfully when email does not exist", async () => {
      // Arrange
      const mockUserData = { email: "test@example.com", name: "Test User" };
      const mockCreatedUser = { id: 1, ...mockUserData };

      // Setup mocks
      vi.mocked(userRepo.existByEmail).mockResolvedValue(false);
      vi.mocked(userRepo.create).mockResolvedValue(mockCreatedUser);

      // Act
      const result = await userService.createUser(mockUserData);

      // Assert
      expect(userRepo.existByEmail).toHaveBeenCalledWith(mockUserData.email);
      expect(userRepo.create).toHaveBeenCalledWith(mockUserData);
      expect(result).toEqual(mockCreatedUser);
    });

    it("should throw DuplicateError when email already exists", async () => {
      // Arrange
      const mockUserData = {
        email: "existing@example.com",
        name: "Existing User",
      };

      // Setup mocks
      vi.mocked(userRepo.existByEmail).mockResolvedValue(true);

      // Act & Assert
      await expect(userService.createUser(mockUserData)).rejects.toThrow(
        new DuplicateError(
          `User with email ${mockUserData.email} already exists`,
        ),
      );
      expect(userRepo.existByEmail).toHaveBeenCalledWith(mockUserData.email);
      expect(userRepo.create).not.toHaveBeenCalled();
    });
  });
});
