import config from "#config";
import { logger, openApiBuilder } from "#lib";
import {
  errorHandler,
  httpLogger,
  requestIdGenerator,
  routeNotFoundHandler,
} from "#middleware";

import "./config/registry.js";

import express from "express";
import swaggerUi from "swagger-ui-express";

import v1Router from "./features/v1.router.js";

const app = express();

app.use(express.json());
app.use(requestIdGenerator);
app.use(httpLogger);

const { endpoint, serve } = config.oas.provide.ui;
if (serve) {
  app.use(endpoint, swaggerUi.serve, swaggerUi.setup(openApiBuilder.getSpec()));
  logger.info(
    `✅ Swagger UI available at ${endpoint} in ${config.env.NODE_ENV} mode`,
  );
}

app.use("/api/v1", v1Router);

app.use(routeNotFoundHandler);
app.use(errorHandler);

export default app;
