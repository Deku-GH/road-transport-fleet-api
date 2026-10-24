
import { Router } from "express";
import { comionController } from "../controllers/ComionController.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const route = Router();

/**
 * @swagger
 * /api/comions:
 *   get:
 *     summary: Get all comions
 *     tags: [Comions]
 *     responses:
 *       200:
 *         description: Successfully retrieved all comions
 *       500:
 *         description: Internal server error
 */
route.get("/", comionController.getAllComions);

/**
 * @swagger
 * /api/comions:
 *   post:
 *     summary: Create a comion
 *     tags: [Comions]
 *     responses:
 *       201:
 *         description: Comion created successfully
 *       500:
 *         description: Failed to create comion
 */
route.post("/", comionController.createComion);

/**
 * @swagger
 * /api/comions/{id}:
 *   post:
 *     summary: Get comion by ID
 *     tags: [Comions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comion found
 *       404:
 *         description: Comion not found
 *       500:
 *         description: Internal server error
 */
route.post("/:id", comionController.getComionById);

/**
 * @swagger
 * /api/comions/{id}:
 *   put:
 *     summary: Update comion
 *     tags: [Comions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comion updated successfully
 *       404:
 *         description: Comion not found
 *       500:
 *         description: Internal server error
 */
route.put("/:id", comionController.updateComion);

/**
 * @swagger
 * /api/comions/{id}:
 *   delete:
 *     summary: Delete comion
 *     tags: [Comions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comion deleted successfully
 *       404:
 *         description: Comion not found
 *       500:
 *         description: Internal server error
 */
route.delete("/:id", comionController.deleteComion);

export const comionRoutes = route;
