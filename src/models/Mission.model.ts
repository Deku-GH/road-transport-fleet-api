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
      ref: "comion",
      required: true,
    },

    remorqueId: {
      type: Schema.Types.ObjectId,
      ref: "remorque",
      required: true,
    },

    dateAssignation: {
      type: Date,
      default: Date.now,
    },
    // statut: {
    //     type: String,
    //     enum: Object.values(MissionStatus),
    //     default: MissionStatus.A_FAIRE,
    //   },
  });

  export const Mission = mongoose.model<IMission>("Mission", missionSchema);
