import Router from "express";
import { authController } from "../controllers/AuthController.js";
import { signUpSchema } from "../validators/Auth.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authLimiter } from "../config/rateLimiter.js";

const authrouter = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User registration and login
 */

/**
 * @swagger
 * /api/auth/signup:
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
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *               - role
 *             properties:
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
authrouter.post("/signup",authLimiter,  authController.signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     description: Verifies the user's email and password and returns a JWT.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: mouad@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123!
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   description: JWT access token valid for one hour
 *       404:
 *         description: Email or password is incorrect
 *       500:
 *         description: Server configuration error
 */
authrouter.post("/login", authLimiter,authController.Login);

export const Authrouter = authrouter;
