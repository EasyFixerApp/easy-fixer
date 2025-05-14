import config from "#config";
import { openApiBuilder } from "#lib";
import {
  errorHandler,
  httpLogger,
  requestIdGenerator,
  routeNotFoundHandler,
} from "#middleware";

import "./config/registry.js";

import cors from "cors";
import express, { json } from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import v1Router from "./features/v1.router.js";

const app = express();

// security middleware
app.use(helmet());
app.use(cors());

app.use(json());
app.use(requestIdGenerator);
app.use(httpLogger);

app.use("/api/v1", v1Router);

const { path, serve } = config.oas.provide.ui;
if (serve)
  app.use(path, swaggerUi.serve, swaggerUi.setup(openApiBuilder.getSpec()));

app.use(routeNotFoundHandler);
app.use(errorHandler);

export default app;
