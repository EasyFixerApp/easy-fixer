import { healthService } from "./health";

// Export all API services from a single point
export const api = {
  health: healthService,
};
