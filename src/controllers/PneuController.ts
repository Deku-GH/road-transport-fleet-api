import { Request, Response } from "express";
import { pneuService } from "../services/PneuService.js";

class PneuController {
  async getAllPneus(req: Request, res: Response) {
    try {
      const pneus = await pneuService.getAllPneus();

      return res.status(200).json({
        success: true,
        data: pneus,
      });
    } catch (error) {
     if(error instanceof Error){
       return res.status(500).json({
         success: false,
         message: "Failed to retrieve pneus",
         error:error.message
       });

     }

    }
  }

  async getPneuById(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const pneu = await pneuService.getPneuById(id);

      if (!pneu) {
        return res.status(404).json({
          success: false,
          message: "Pneu not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: pneu,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve pneu",
      });
    }
  }

  async createPneu(req: Request, res: Response) {
    try {
      const pneu = await pneuService.createPneu(req.body);

      return res.status(201).json({
        success: true,
        message: "Pneu created successfully",
        data: pneu,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          success: false,
          message: "Failed to create pneu",
          error: error.message,
        });
      }
    }
  }

  async updatePneu(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const updatedPneu = await pneuService.updatePneu(id, req.body);

      if (!updatedPneu) {
        return res.status(404).json({
          success: false,
          message: "Pneu not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Pneu updated successfully",
        data: updatedPneu,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to update pneu",
      });
    }
  }

  async deletePneu(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const deletedPneu = await pneuService.deletePneu(id);

      if (!deletedPneu) {
        return res.status(404).json({
          success: false,
          message: "Pneu not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Pneu deleted successfully",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to delete pneu",
      });
    }
  }
}

export const pneuController = new PneuController();