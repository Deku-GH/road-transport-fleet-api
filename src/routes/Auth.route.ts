import Router from "express";
import { authController } from "../controllers/AuthController.js";
import { signUpSchema } from "../validators/Auth.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const authrouter = Router();

authrouter.post("/signup", validate(signUpSchema),authController.signup);
authrouter.post("/login", authController.Login);

export const Authrouter = authrouter;
