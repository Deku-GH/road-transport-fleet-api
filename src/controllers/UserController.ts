import { Request, Response } from "express";
import { userService } from "../services/userService.js";

class UserController {
  getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await userService.getAllUsers();

      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve users",
      });
    }
  };

  async getUserById(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve user",
      });
    }
  }

  async updateUser(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const updatedUser = await userService.updateUser(id, req.body);

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({
          success: false,
          message: "Failed to update user",
          error: error.message
        });
      }
    }
  }

  async deleteUser(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const deletedUser = await userService.deleteUser(id);

      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to delete user",
      });
    }
  }
}

export const userController = new UserController();
