import mongoose, { Schema, Document } from "mongoose";
import { MaintenanceType, MaintenanceStatus } from "../types/enums.js";

export interface IMaintenance extends Document {
  camionId?: mongoose.Types.ObjectId;
  remorqueId?: mongoose.Types.ObjectId;
  description: string;
  type: MaintenanceType;
  seuilKm: number;
  kilometrageActuel: number;
  status: MaintenanceStatus;
}

const maintenanceSchema = new Schema<IMaintenance>({
  camionId: {
    type: Schema.Types.ObjectId,
    ref: "Camion",
  },

  remorqueId: {
    type: Schema.Types.ObjectId,
    ref: "Remorque",
  },

  type: {
    type: String,
    enum: Object.values(MaintenanceType),
    required: true,
  },

  seuilKm: {
    type: Number,
    required: true,
    min: 0,
  },

  kilometrageActuel: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },

  status: {
    type: String,
    enum: Object.values(MaintenanceStatus),
    default: MaintenanceStatus.A_FAIRE,
  },
});

export const Maintenance = mongoose.model<IMaintenance>(
  "Maintenance",
  maintenanceSchema,
);
