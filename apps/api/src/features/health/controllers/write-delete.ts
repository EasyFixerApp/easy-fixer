import { ValidationError } from "#lib";
import { createResponseJson } from "#utils";
import { zSchema } from "easy-fixer-shared";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

import healthService from "../service.js";

export const checkWriteDelete: RequestHandler = async (req, res) => {
  const parsedBody = zSchema.health.toCreate.safeParse(req.body);

  if (!parsedBody.success) throw new ValidationError(parsedBody.error);

  const writeDeleteStatus = await healthService.checkWriteDelete(
    parsedBody.data,
  );

  res.status(StatusCodes.OK).json(
    createResponseJson({
      data: writeDeleteStatus,
      message: "Database write and delete operations successful",
    }),
  );
};
