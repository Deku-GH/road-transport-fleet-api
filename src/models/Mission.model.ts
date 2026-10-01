import mongoose, { Schema, Document } from "mongoose";

export interface IMission extends Document {
  trajetId: mongoose.Types.ObjectId;
  chauffeurId: mongoose.Types.ObjectId;
  camionId: mongoose.Types.ObjectId;
  remorqueId: mongoose.Types.ObjectId;
  dateAssignation: Date;
}

const missionSchema = new Schema<IMission>({
  trajetId: {
    type: Schema.Types.ObjectId,
    ref: "Trajet",
    required: true,
  },

  chauffeurId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  camionId: {
    type: Schema.Types.ObjectId,
    ref: "Camion",
    required: true,
  },

  remorqueId: {
    type: Schema.Types.ObjectId,
    ref: "Remorque",
    required: true,
  },

  dateAssignation: {
    type: Date,
    default: Date.now,
  },
});

export const Mission = mongoose.model<IMission>("Mission", missionSchema);
