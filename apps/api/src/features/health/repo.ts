import { prisma } from "#lib";
import { Types } from "easy-fixer-shared";

const healthRepo = {
  checkDatabaseConnection: async (): Promise<boolean> => {
    // Simple query to check if database is connected
    await prisma.$queryRaw`SELECT 1`;
    return true;
  },

  // Create and delete a test record as a transaction
  checkWriteDelete: async (data: Types.Health.CreateRequest) => {
    // Create a test record
    return await prisma.$transaction(async (tx) => {
      const record = await tx.healthCheck.create({
        data: {
          email: data.email,
        },
      });

      // Delete the test record
      await tx.healthCheck.delete({
        where: {
          id: record.id,
        },
      });

      return record;
    });
  },
};

export default healthRepo;
