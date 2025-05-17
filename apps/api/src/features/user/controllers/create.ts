import { ValidationError } from "#lib";
import { createResponseJson } from "#utils";
import { user } from "easy-fixer-shared";
import { RequestHandler } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import userService from "../service.js";

export const createUser: RequestHandler = async (req, res) => {
  // Validate request body
  const parsedBody = user.toCreate.schema.safeParse(req.body);

  if (!parsedBody.success) throw new ValidationError(parsedBody.error);

  // Create user
  const newUser = await userService.createUser(parsedBody.data);

  // Send Success response
  res.status(StatusCodes.CREATED).json(
    createResponseJson({
      data: newUser,
      message: ReasonPhrases.CREATED,
    }),
  );
};
