import { DuplicateError } from "#lib";
import { User } from "easy-fixer-shared";

import userRepo from "./repo.js";

export const userService = {
  createUser: async (data: User.Create.Request) => {
    const isExist = await userRepo.existByEmail(data.email);

    if (isExist)
      throw new DuplicateError(`User with email ${data.email} already exists`);

    return await userRepo.create(data);
  },
};

export default userService;
