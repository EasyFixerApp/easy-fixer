import { Router } from "express";

import userRouter from "./user/router.js";

const v1Router = Router();

v1Router.use("/users", userRouter);
v1Router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});
v1Router.get("/health", (req, res) => {
  res.status(200).json({
    message: "API is healthy",
  });
});

export default v1Router;
