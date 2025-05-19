import { Types } from "easy-fixer-shared";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

import healthService from "../service.js";

export const checkHealth: RequestHandler = async (req, res) => {
  const isDBHealthy = await healthService.checkHealth();

  const responseData: Types.Health.CheckResponse = {
    data: {
      db: isDBHealthy ? "up" : "down",
    },
    message: "The server is healthy. Database info is on property `db`.",
    success: true,
  };

  res.status(StatusCodes.OK).json(responseData);
};
