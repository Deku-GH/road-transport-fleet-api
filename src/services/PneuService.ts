import { Pneu, IPneu } from "../models/pneu.model.js";

export class PneuService {
  async createPneu(data: Partial<IPneu>) {
    return await Pneu.create(data);
  }

  async getAllPneus() {
    return await Pneu.find().populate("camionId");
  }

  async getPneuById(id: string) {
    return await Pneu.findById(id).populate("camionId");
  }

  async updatePneu(id: string, data: Partial<IPneu>) {
    return await Pneu.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deletePneu(id: string) {
    return await Pneu.findByIdAndDelete(id);
  }
}

export const pneuService = new PneuService();
