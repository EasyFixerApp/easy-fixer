import { logger, prisma } from "#lib";
import {
  errorHandler,
  httpLogger,
  requestIdGenerator,
  routeNotFoundHandler,
} from "#middleware";
import express from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const app = express();

app.use(express.json());
app.use(requestIdGenerator);
app.use(httpLogger);

app.get("/", (req, res) => {
  res.send("Hello World!");
  logger.info("Hello World!");
});

app.get("/get-404", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    message: ReasonPhrases.NOT_FOUND,
  });
});

app.get("/server-error", (req, res) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
  });
});

app.get("/throw-error", (req, res, next) => {
  try {
    throw new Error("This is a test error");
  } catch (error) {
    next(error);
  }
});

app.get("/test-db", async (req, res) => {
  const user = await prisma.user.upsert({
    create: {
      email: "alice@example.com",
      name: "Alice",
    },
    update: {},
    where: {
      email: "alice@example.com",
    },
  });

  res.status(StatusCodes.OK).json({
    data: user,
    message: ReasonPhrases.OK,
  });
});

app.use(routeNotFoundHandler);
app.use(errorHandler);

export default app;
