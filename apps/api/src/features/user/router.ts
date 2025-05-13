import { Router } from "express";

import { createUser } from "./controllers/create.js";

const userRouter = Router();

/**
 * @openapi
 * /users/create:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserCreateResponse'
 *       400:
 *         description: Bad request - validation error
 */
userRouter.post("/create", createUser);

export default userRouter;
