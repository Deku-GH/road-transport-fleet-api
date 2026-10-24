import { Request, Response, NextFunction } from "express";
import AnalyticsService from "../services/Analytics.Service.js";

class AnalyseController {
  getEcoPerformance = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await AnalyticsService.culucleEcoPerformance();

      res.status(200).json({
        message: "Eco performance retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getTiresHealth = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await AnalyticsService.getTiresHealthMatrix();

      res.status(200).json({
        message: "Tires health retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getFinancialESG = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { startDate, endDate } = req.query;

      const result = await AnalyticsService.getFinancialESG(
        startDate as string ,
        endDate as string,
      );

      res.status(200).json({
        message: "Financial and ESG metrics retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

export const analyseController = new AnalyseController();
