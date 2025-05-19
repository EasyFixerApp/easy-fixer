import { healthService } from "./health";
import { userService } from "./user";

// Export all API services from a single point
export const api = {
  health: healthService,
  user: userService,
};

export * from "./health";
export * from "./user";
