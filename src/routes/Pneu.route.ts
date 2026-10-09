import { Router } from "express";
import { pneuController } from "../controllers/PneuController.js";

const router = Router();

router.get("/", pneuController.getAllPneus);
router.get("/:id", pneuController.getPneuById);
router.post("/", pneuController.createPneu);
router.put("/:id", pneuController.updatePneu);
router.delete("/:id", pneuController.deletePneu);

export const pneuRoutes = router;