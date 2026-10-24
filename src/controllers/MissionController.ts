import { Request, Response } from "express";
import { missionService } from "../services/MissionService.js";
import { checkVicilestatus } from "../repo/mission.rule.js";
import { downloadMissionPdf } from "../services/missionPdf.service.js";

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
      const { camionId, remorqueId } = req.body;
      await checkVicilestatus( camionId, remorqueId );
      const mission = await missionService.createMission(req.body);

      return res.status(201).json({
        success: true,
        message: "Mission created successfully",
        data: mission,
      });
    } catch (error: unknown) {
      const err = error as Error & { statusCode?: number };
      return res.status(err.statusCode ?? 500).json({
        success: false,
        message:
          err.statusCode && err.statusCode < 500
            ? err.message
            : "Failed to create mission",
      });
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
    } catch ( error ) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to delete mission",
      });
    }
  }
    async downloadMission(req:Request,res:Response): Promise<void> {
  try {
  
    

console.log("ej")
  } catch (error) {
    console.error("Mission PDF error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        message: "Failed to generate mission PDF",
      });
    }
  }
};
}

export const missionController = new MissionController();
