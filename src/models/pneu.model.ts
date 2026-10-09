import mongoose, { Schema, Document } from "mongoose";
import { PneuStatus } from "../types/enums.js";

export interface IPneu extends Document {
  camionId: mongoose.Types.ObjectId;
  type: string;
  position: string;
  kilometrage: number;
  kmLimite: number;
  status: PneuStatus;
}

const pneuSchema = new Schema<IPneu>({
  camionId: {
    type: Schema.Types.ObjectId,
    ref: "comion",
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  position: {
    type: String,
    required: true,
  },

  kilometrage: {
    type: Number,
    required: true,
    min: 0,
  },

  kmLimite: {
    type: Number,
    required: true,
    min: 0,
  },

  status: {
    type: String,
    enum: Object.values(PneuStatus),
    default: PneuStatus.GOOD,
  },
});

export const Pneu = mongoose.model<IPneu>("Pneu", pneuSchema);
