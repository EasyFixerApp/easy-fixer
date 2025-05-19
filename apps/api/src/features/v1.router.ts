import { Router } from "express";

import healthRouter from "./health/router.js";
import userRouter from "./user/router.js";

const v1Router = Router();

v1Router.use("/users", userRouter);
v1Router.use("/health", healthRouter);

export default v1Router;
