import { Request, Response } from "express";
import { maintenanceService } from "../services/MaintenanceService.js";

class MaintenanceController {
  async getAllMaintenances(req: Request, res: Response) {
    try {
      const maintenances = await maintenanceService.getAllMaintenances();

      return res.status(200).json({
        success: true,
        data: maintenances,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve maintenances",
      });
    }
  }

  async getMaintenanceById(
    req: Request<{ id: string }>,
    res: Response
  ) {
    try {
      const { id } = req.params;

      const maintenance = await maintenanceService.getMaintenanceById(id);

      if (!maintenance) {
        return res.status(404).json({
          success: false,
          message: "Maintenance not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: maintenance,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve maintenance",
      });
    }
  }

  async createMaintenance(req: Request, res: Response) {
    try {
      const maintenance = await maintenanceService.createMaintenance(
        req.body
      );

      return res.status(201).json({
        success: true,
        message: "Maintenance created successfully",
        data: maintenance,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          success: false,
          message: "Failed to create maintenance",
          error: error.message,
        });
      }
    }
  }

  async updateMaintenance(
    req: Request<{ id: string }>,
    res: Response
  ) {
    try {
      const { id } = req.params;

      const updatedMaintenance =
        await maintenanceService.updateMaintenance(id, req.body);

      if (!updatedMaintenance) {
        return res.status(404).json({
          success: false,
          message: "Maintenance not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Maintenance updated successfully",
        data: updatedMaintenance,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to update maintenance",
      });
    }
  }

  async deleteMaintenance(
    req: Request<{ id: string }>,
    res: Response
  ) {
    try {
      const { id } = req.params;

      const deletedMaintenance =
        await maintenanceService.deleteMaintenance(id);

      if (!deletedMaintenance) {
        return res.status(404).json({
          success: false,
          message: "Maintenance not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Maintenance deleted successfully",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to delete maintenance",
      });
    }
  }
}

export const maintenanceController = new MaintenanceController();