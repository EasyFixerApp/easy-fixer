import { Router } from "express";

import { checkHealth } from "./controllers/check.js";
import { checkWriteDelete } from "./controllers/write-delete.js";

const healthRouter = Router();

/**
 * @openapi
 * /health/check:
 *   get:
 *     tags:
 *       - API Health
 *     summary: Check if the server and database are running
 *     responses:
 *       200:
 *         description: Both server and database are operational
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthCheckResponse'
 *       500:
 *         description: Server or database is not operational
 */
healthRouter.get("/check", checkHealth);

/**
 * @openapi
 * /health/write-delete:
 *   post:
 *     tags:
 *       - API Health
 *     summary: Check database write and delete operations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HealthWriteDeleteRequest'
 *     responses:
 *       200:
 *         description: Database write and delete operations are working correctly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthWriteDeleteResponse'
 *       500:
 *         description: Database operations failed
 */
healthRouter.post("/write-delete", checkWriteDelete);

export default healthRouter;
