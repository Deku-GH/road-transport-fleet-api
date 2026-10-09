import { Request, Response } from "express";
import { comionService } from "../services/comionService.js";

class ComionController {
  async getAllComions(req: Request, res: Response) {
    try {
      const comions = await comionService.getAllComions();

      return res.status(200).json({
        success: true,
        data: comions,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve comions",
      });
    }
  }

  async getComionById(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const comion = await comionService.getComionById(id);

      if (!comion) {
        return res.status(404).json({
          success: false,
          message: "Comion not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: comion,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve comion",
      });
    }
  }

  async createComion(req: Request, res: Response) {
    try {
      const comion = await comionService.createComion(req.body);

      return res.status(201).json({
        success: true,
        message: "Comion created successfully",
        data: comion,
      });
    } catch (error) {
       if (error instanceof Error) {
          
      return res.status(500).json({
        success: false,
        message: "Failed to create comion",
        error:error.message,
      });
        }}
  }

  async updateComion(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const updatedComion = await comionService.updateComion(id, req.body);

      if (!updatedComion) {
        return res.status(404).json({
          success: false,
          message: "Comion not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Comion updated successfully",
        data: updatedComion,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to update comion",
      });
    }
  }

  async deleteComion(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const deletedComion = await comionService.deleteComion(id);

      if (!deletedComion) {
        return res.status(404).json({
          success: false,
          message: "Comion not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Comion deleted successfully",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to delete comion",
      });
    }
  }
}

export const comionController = new ComionController();
