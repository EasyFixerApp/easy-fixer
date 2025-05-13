import { prisma, Prisma } from "#lib";

const userRepo = {
  create: async (data: Prisma.UserCreateInput) => {
    const user = await prisma.user.create({
      data,
    });

    return user;
  },

  existByEmail: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return !!user;
  },

  findByIdWithPosts: async (id: number) => {
    const user = await prisma.user.findUnique({
      include: {
        Post: true,
      },
      omit: {
        id: true,
      },
      where: {
        id,
      },
    });

    return user;
  },
};
export default userRepo;
