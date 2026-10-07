import mongoose, { Schema, Document } from "mongoose";
import { VehicleStatus } from "../types/enums.js";

export interface Iremorque extends Document {
  type: string;
  matricule: number;
  chargeMax: number;
  status: VehicleStatus;
}

const remorqueSchema = new Schema<Iremorque>({
  type: {
    type: String,
    required: true,
  },
  matricule: {
    type: Number,
    required: true,
  },
  chargeMax: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(VehicleStatus),
  },
});

export const remorque = mongoose.model<Iremorque>("remorque", remorqueSchema);
