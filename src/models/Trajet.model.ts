import mongoose, { Schema, Document } from "mongoose";
import { TrajetStatus } from "../types/enums.js";

export interface ITrajet extends Document {
  depart: string;
  arrivee: string;
  dateDepartPrevue: Date;
  dateArriveePrevue: Date;
  marchandise: string;
  distanceKm: number;
  volumeGasoil: number;
  coutGasoil: number;

  statut: TrajetStatus;
}

const trajetSchema = new Schema<ITrajet>({
  depart: {
    type: String,
    required: true,
  },

  arrivee: {
    type: String,
    required: true,
  },

  dateDepartPrevue: {
    type: Date,
    required: true,
  },

  dateArriveePrevue: {
    type: Date,
    required: true,
  },

  marchandise: {
    type: String,
    required: true,
  },

  distanceKm: {
    type: Number,
    min: 0,
  },


  volumeGasoil: {
    type: Number,
    min: 0,
  },

  coutGasoil: {
    type: Number,
    min: 0,
  },

  statut: {
    type: String,
    enum: Object.values(TrajetStatus),
    default: TrajetStatus.A_FAIRE,
  },
});

export const trajet = mongoose.model<ITrajet>("Trajet", trajetSchema);
