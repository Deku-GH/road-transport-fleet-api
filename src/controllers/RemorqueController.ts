import { Request, Response } from "express";
import { remorqueService } from "../services/remorqueService.js";

class RemorqueController {

  async getAllRemorques(req: Request, res: Response) {
    try {
      const remorques = await remorqueService.getAllRemorques();

      return res.status(200).json({
        success: true,
        data: remorques,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve remorques",
      });
    }
  }

  async getRemorqueById(
    req: Request<{ id: string }>,
    res: Response
  ) {
    try {
      const { id } = req.params;

      const remorque = await remorqueService.getRemorqueById(id);

      if (!remorque) {
        return res.status(404).json({
          success: false,
          message: "Remorque not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: remorque,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve remorque",
      });
    }
  }

  async createRemorque(req: Request, res: Response) {
    try {
      const remorque = await remorqueService.createRemorque(
        req.body
      );

      return res.status(201).json({
        success: true,
        message: "Remorque created successfully",
        data: remorque,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to create remorque",
      });
    }
  }

  // PUT /remorques/:id
  async updateRemorque(
    req: Request<{ id: string }>,
    res: Response
  ) {
    try {
      const { id } = req.params;

      const updatedRemorque =
        await remorqueService.updateRemorque(id, req.body);

      if (!updatedRemorque) {
        return res.status(404).json({
          success: false,
          message: "Remorque not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Remorque updated successfully",
        data: updatedRemorque,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to update remorque",
      });
    }
  }

  // DELETE /remorques/:id
  async deleteRemorque(
    req: Request<{ id: string }>,
    res: Response
  ) {
    try {
      const { id } = req.params;

      const deletedRemorque =
        await remorqueService.deleteRemorque(id);

      if (!deletedRemorque) {
        return res.status(404).json({
          success: false,
          message: "Remorque not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Remorque deleted successfully",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to delete remorque",
      });
    }
  }
}

export const remorqueController = new RemorqueController();