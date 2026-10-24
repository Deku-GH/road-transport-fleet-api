import { Pneu } from "../models/pneu.model.js";
import { trajet } from "../models/Trajet.model.js";
import { PneuStatus } from "../types/enums.js";

class analyseService {
  async culucleEcoPerformance() {
    const resulte = await trajet.aggregate([
      {
        $group: {
          _id: null,
          totalLiters: { $sum: "$volumeGasoil" },
          totalDistance: { $sum: "$distanceKm" },
        },
      },
      {
        $project: {
          _id: 0,
          totalLiters: 1,
          totalDistance: 1,
          avgConsumption: {
            $cond: [
              { $gt: ["$totalDistance", 0] },
              {
                $multiply: [
                  { $divide: ["$totalLiters", "$totalDistance"] },
                  100,
                ],
              },
              0,
            ],
          },
        },
      },
      {
        $project: {
          totalLiters: 1,
          totalDistance: 1,
          avgConsumption: 1,
          ecoScore: {
            $max: [
              0,
              {
                $min: [
                  100,
                  {
                    $subtract: [
                      100,
                      {
                        $multiply: [
                          { $subtract: ["$avgConsumption", 30] },
                          2.5,
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
    ]);

    return resulte;
  }
  async getTiresHealthMatrix() {
    const result = await Pneu.aggregate([
      {
        $match: {
          archived: false,
          status: { $ne: PneuStatus.TO_REPLACE },
          kilometrage: { $gte: 0 },
          profondeurSculpture: { $gte: 0 },
        },
      },

      {
        $addFields: {
          remainingKm: {
            $max: [
              0,
              {
                $subtract: [{ $ifNull: ["$kmLimite", 80000] }, "$kilometrage"],
              },
            ],
          },
        },
      },

      {
        $addFields: {
          isCritical: {
            $or: [
              { $lt: ["$remainingKm", 5000] },
              { $lte: ["$profondeurSculpture", 3] },
            ],
          },
        },
      },

      {
        $group: {
          _id: "$position",
          totalTires: { $sum: 1 },
          averageKilometrage: { $avg: "$kilometrage" },
          criticalTires: {
            $sum: {
              $cond: ["$isCritical", 1, 0],
            },
          },
          estimatedBudget: {
            $sum: {
              $cond: ["$isCritical", 3800, 0],
            },
          },
        },
      },

      {
        $sort: { _id: 1 },
      },
    ]);

    return result;
  }
  async getFinancialESG(startDate: string, endDate: string) {
    const match: any = {};

    if (startDate || endDate) {
      match.dateDepartPrevue = {};

      if (startDate) {
        match.dateDepartPrevue.$gte = new Date(startDate);
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setUTCHours(23, 59, 59, 999);
        match.dateDepartPrevue.$lte = end;
      }
    }

    const result = await trajet.aggregate([
      {
        $match: match,
      },
      {
        $group: {
          _id: null,
          totalLiters: { $sum: "$volumeGasoil" },
          totalFuelCost: { $sum: "$coutGasoil" },
        },
      },
      {
        $project: {
          _id: 0,
          totalLiters: 1,
          totalFuelCost: 1,
          co2Kg: {
            $multiply: ["$totalLiters", 2.68],
          },
          co2Tonnes: {
            $divide: [{ $multiply: ["$totalLiters", 2.68] }, 1000],
          },
        },
      },
    ]);

    return (
      result[0] ?? {
        totalLiters: 0,
        totalFuelCost: 0,
        co2Kg: 0,
        co2Tonnes: 0,
      }
    );
  }
}

export default new analyseService();
