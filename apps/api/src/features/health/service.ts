import { Types } from "easy-fixer-shared";

import healthRepo from "./repo.js";

export const healthService = {
  checkHealth: async () => {
    // Check if database is connected by running a simple query
    return await healthRepo.checkDatabaseConnection();
  },

  checkWriteDelete: async (data: Types.Health.CreateRequest) => {
    // Create and delete a test record as a transaction
    return await healthRepo.checkWriteDelete(data);
  },
};

export default healthService;
