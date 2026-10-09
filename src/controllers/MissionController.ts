import { Request, Response } from "express";
import { missionService } from "../services/MissionService.js";

class MissionController {
  async getAllMissions(req: Request, res: Response) {
    try {
      const missions = await missionService.getAllMissions();

      return res.status(200).json({
        success: true,
        data: missions,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve missions",
      });
    }
  }

  async getMissionById(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const mission = await missionService.getMissionById(id);

      if (!mission) {
        return res.status(404).json({
          success: false,
          message: "Mission not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: mission,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve mission",
      });
    }
  }

  async createMission(req: Request, res: Response) {
    try {
      const mission = await missionService.createMission(req.body);

      return res.status(201).json({
        success: true,
        message: "Mission created successfully",
        data: mission,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          success: false,
          message: "Failed to create mission",
          error: error.message,
        });
      }
    }
  }

  async updateMission(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const updatedMission = await missionService.updateMission(id, req.body);

      if (!updatedMission) {
        return res.status(404).json({
          success: false,
          message: "Mission not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Mission updated successfully",
        data: updatedMission,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to update mission",
      });
    }
  }

  async deleteMission(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const deletedMission = await missionService.deleteMission(id);

      if (!deletedMission) {
        return res.status(404).json({
          success: false,
          message: "Mission not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Mission deleted successfully",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to delete mission",
      });
    }
  }
}

export const missionController = new MissionController();