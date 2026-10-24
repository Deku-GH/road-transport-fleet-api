import { Router } from "express";
import { authControllerV2 } from "../../controllers/v2/AuthController.v2.js";

const authrouterV2 = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication/v2
 *   description: User registration and login
 */

/**
 * @swagger
 * /api/v2/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Creates a user account after validating the request body.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - neckname
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *               - role
 *             properties:
 *  neckname:string
 *                 type: string
 *                 example: Mouad
 *               firstname:
 *                 type: string
 *                 example: Mouad
 *               lastname:
 *                 type: string
 *                 example: Sertati
 *               email:
 *                 type: string
 *                 format: email
 *                 example: mouad@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123!
 *               role:
 *                 type: string
 *                 example: chauffeur
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Request validation failed
 *       500:
 *         description: Error creating user
 */

authrouterV2.post("/signup", authControllerV2.signup);

export default authrouterV2;
