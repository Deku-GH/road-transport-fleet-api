import { Router } from "express";
import { missionController } from "../controllers/MissionController.js";

const router = Router();

router.get("/", missionController.getAllMissions);
router.get("/:id", missionController.getMissionById);
router.post("/", missionController.createMission);
router.put("/:id", missionController.updateMission);
router.delete("/:id", missionController.deleteMission);

export const missionRoutes = router;