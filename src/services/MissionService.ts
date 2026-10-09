import { Mission, IMission } from "../models/Mission.model.js";

export class MissionService {
  async createMission(data: Partial<IMission>) {
    return await Mission.create(data);
  }

  async getAllMissions() {
    return await Mission.find()
      .populate("trajetId")
      .populate("chauffeurId")
      .populate("camionId")
      .populate("remorqueId");
  }

  async getMissionById(id: string) {
    return await Mission.findById(id)
      .populate("trajetId")
      .populate("chauffeurId")
      .populate("camionId")
      .populate("remorqueId");
  }

  async updateMission(id: string, data: Partial<IMission>) {
    return await Mission.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteMission(id: string) {
    return await Mission.findByIdAndDelete(id);
  }
}

export const missionService = new MissionService();
