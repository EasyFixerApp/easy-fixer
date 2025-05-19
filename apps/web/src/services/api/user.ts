import apiClient from "@/lib/axios";
import { User } from "easy-fixer-shared";

type UserCreateFn = (
  userData: User.Create.Request,
) => Promise<User.Create.Response>;

const userCreate: UserCreateFn = async (userData) => {
  const response = await apiClient.post("/users/create", userData);
  return response.data;
};

export const userService = {
  create: userCreate,
};
