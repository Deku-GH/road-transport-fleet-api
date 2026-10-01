import { userService } from "../services/userService.js";
import { Request, Response } from "express";
class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.createUser(req.body);

      res.status(201).json({
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        message: "not create",
      });
    }
  }
}
export const userController = new UserController();
