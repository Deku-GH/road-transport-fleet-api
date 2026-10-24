import { Pneu, IPneu } from "../models/pneu.model.js";
import { comion } from "../models/camion.model.js";

export class PneuService {
  async createPneu(data: Partial<IPneu>) {
    const vicule = await comion.findById(data.camionId);
    if (!vicule) {
      throw new Error("Camion introuvable");
    }
    const numbrePneu = await Pneu.countDocuments({
      camionId:data.camionId
    })
     if(numbrePneu>=8){
      throw new Error("Ce camion possède déjà 6 pneus")
     }
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
