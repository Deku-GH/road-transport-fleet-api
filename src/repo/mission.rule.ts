import { comion } from "../models/camion.model.js";
import { remorque } from "../models/remorque.model.js";

export const checkVicilestatus = async (camionId:string, remorqueId:string) => {
  const Comion = await comion.findById(camionId);
  const Remorque = await remorque.findById(remorqueId);
  if (!Comion) {
    throw Object.assign(new Error("Comion introuvable"), {
      statusCode: 404,
    });
  }
  if (!Remorque) {
    throw Object.assign(new Error("Remorque introuvable"), {
      statusCode: 404,
    });
  }
  if (Comion.status === "maintenance") {
    throw Object.assign(
      new Error("Impossible d'assigner un camion en maintenance"),
      { statusCode: 409 },
    );
  }

  if (!Remorque) {
    throw Object.assign(new Error("Remorque introuvable"), {
      statusCode: 404,
    });
  }

  if (Remorque.status === "maintenance") {
    throw Object.assign(
      new Error("Impossible d'assigner une remorque en maintenance"),
      { statusCode: 409 },
    );
  }

  return true;
};
