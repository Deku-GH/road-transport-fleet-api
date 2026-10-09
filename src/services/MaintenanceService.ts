import { Maintenance, IMaintenance } from "../models/Maintenance.model.js";

export class MaintenanceService {
  async createMaintenance(data: Partial<IMaintenance>) {
    return await Maintenance.create(data);
  }

  async getAllMaintenances() {
    return await Maintenance.find()
      .populate("camionId")
      .populate("remorqueId");
  }

  async getMaintenanceById(id: string) {
    return await Maintenance.findById(id)
      .populate("camionId")
      .populate("remorqueId");
  }

  async updateMaintenance(id: string, data: Partial<IMaintenance>) {
    return await Maintenance.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteMaintenance(id: string) {
    return await Maintenance.findByIdAndDelete(id);
  }
}

export const maintenanceService = new MaintenanceService();