import { userService } from "../../services/userService.js";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthControllerV2 {
  signup = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.body.nickname) {
        res.status(400).json({ message: "Nickname is required" });
        return;
      }

      const user = await userService.createUser(req.body);

      res.status(201).json({
        message: "User created successfully v2",
        data: user,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating user" });
    }
  };
}

export const authControllerV2 = new AuthControllerV2();
