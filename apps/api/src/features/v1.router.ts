import { Router } from "express";

import userRouter from "./user/router.js";

const v1Router = Router();

v1Router.use("/users", userRouter);

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Service is healthy
 */
v1Router.get("/health", (req, res) => {
  res.status(200).send();
});

export default v1Router;
