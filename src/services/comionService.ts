
import { comion, Icomion } from "../models/camion.model.js";

class ComionService {
  async getAllComions():Promise<object> {
    return await comion.find();
  }

  async getComionById(id: string) {
    return await comion.findById(id);
  }

  async createComion(data: Icomion) {
    return await comion.create(data);
  }

  async updateComion(id: string, data: Partial<Icomion>) {
    return await comion.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async deleteComion(id: string) {
    return await comion.findByIdAndDelete(id);
  }
}

export const comionService = new ComionService();