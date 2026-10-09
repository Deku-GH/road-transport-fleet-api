import mongoose, { Schema, Document } from "mongoose";
import { VehicleStatus } from "../types/enums.js";

export interface Icomion extends Document {
  modele: string;
  matricule: number;
  kilometrage: number;
  status: VehicleStatus;
}

const comionSchema = new Schema<Icomion>({
  modele: {
    type: String,
    required: true,
  },

  matricule: {
    type: Number,
    required: true,
  },

  kilometrage: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: Object.values(VehicleStatus),
    default: VehicleStatus.AVAILABLE,
  },
});

export const comion = mongoose.model<Icomion>(
  "comion",
  comionSchema
);