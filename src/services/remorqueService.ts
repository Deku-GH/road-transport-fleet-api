import { remorque, Iremorque } from "../models/remorque.model.js";

class RemorqueService {
  async getAllRemorques() {
    return await remorque.find();
  }

  async getRemorqueById(id: string) {
    return await remorque.findById(id);
  }

  async createRemorque(data: Iremorque) {
    return await remorque.create(data);
  }

  async updateRemorque(id: string, data: Partial<Iremorque>) {
    return await remorque.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteRemorque(id: string) {
    return await remorque.findByIdAndDelete(id);
  }
}

export const remorqueService = new RemorqueService();
