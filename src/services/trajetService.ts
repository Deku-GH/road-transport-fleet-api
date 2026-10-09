import { trajet, ITrajet } from "../models/Trajet.model.js";

export class TrajetService {
  async createTrajet(data: Partial<ITrajet>) {
    return await trajet.create(data);
  }

  async getAllTrajets() {
    return await trajet.find();
  }

  async getTrajetById(id: string) {
    return await trajet.findById(id);
  }

  async updateTrajet(id: string, data: Partial<ITrajet>) {
    return await trajet.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteTrajet(id: string) {
    return await trajet.findByIdAndDelete(id);
  }
}

export const trajetService = new TrajetService();