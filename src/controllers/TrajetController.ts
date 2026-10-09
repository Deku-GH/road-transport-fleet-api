import { Request, Response } from "express";
import { trajetService } from "../services/trajetService.js";

class TrajetController {
  async getAllTrajets(req: Request, res: Response) {
    try {
      const trajets = await trajetService.getAllTrajets();

      return res.status(200).json({
        success: true,
        data: trajets,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve trajets",
      });
    }
  }

  async getTrajetById(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const trajet = await trajetService.getTrajetById(id);

      if (!trajet) {
        return res.status(404).json({
          success: false,
          message: "Trajet not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: trajet,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve trajet",
      });
    }
  }

  async createTrajet(req: Request, res: Response) {
    try {
      const trajet = await trajetService.createTrajet(req.body);

      return res.status(201).json({
        success: true,
        message: "Trajet created successfully",
        data: trajet,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          success: false,
          message: "Failed to create trajet",
          error: error.message,
        });
      }
    }
  }

  async updateTrajet(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const updatedTrajet = await trajetService.updateTrajet(id, req.body);

      if (!updatedTrajet) {
        return res.status(404).json({
          success: false,
          message: "Trajet not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Trajet updated successfully",
        data: updatedTrajet,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to update trajet",
      });
    }
  }

  async deleteTrajet(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const deletedTrajet = await trajetService.deleteTrajet(id);

      if (!deletedTrajet) {
        return res.status(404).json({
          success: false,
          message: "Trajet not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Trajet deleted successfully",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to delete trajet",
      });
    }
  }
}

export const trajetController = new TrajetController();