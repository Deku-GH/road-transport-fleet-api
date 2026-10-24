import { userService } from "../services/userService.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class AuthController {
  signup = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.body);
      const user = await userService.createUser(req.body);

      res.status(201).json({
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      //   console.error(error);
      if (error instanceof Error) {
        res.status(500).json({
          message: "Error creating user",
          error: error.message,
        });
      }
    }
  };
  Login = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await userService.getUserByEmail(req.body.email);

      if (!user) {
        res.status(401).json({
          message: "Invalid email or password",
        });
        return;
      }

      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password,
      );

      if (!isPasswordValid) {
        res.status(401).json({
          message: "Invalid email or password",
        });
        return;
      }

      const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

      if (!JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined");
      }

      const token = jwt.sign(
        {
          userId: user._id.toString(),
          role: user.role,
        },
        JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        },
      );

      res.status(200).json({
        message: "Login successful",

        token,
        user: {
          id: user._id.toString(),
          name: user.firstname,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: "Internal server error",
        });
      }
    }
  };
}
export const authController = new AuthController();
