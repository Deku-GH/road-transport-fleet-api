import { Router } from "express";
import { trajetController } from "../controllers/TrajetController.js";

const router = Router();

router.get("/", trajetController.getAllTrajets);
router.get("/:id", trajetController.getTrajetById);
router.post("/", trajetController.createTrajet);
router.put("/:id", trajetController.updateTrajet);
router.delete("/:id", trajetController.deleteTrajet);

export const trajetRoutes = router;