import { ValidationError } from "#lib";
import { createResponseJson } from "#utils";
import { RequestHandler } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { userCreateInput } from "../model.js";
import userService from "../service.js";

export const createUser: RequestHandler = async (req, res) => {
  // Validate request body
  const parsedBody = userCreateInput.safeParse(req.body);

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
