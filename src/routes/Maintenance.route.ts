import { Router } from "express";
import { maintenanceController } from "../controllers/MaintenanceController.js";

const router = Router();

router.get("/", maintenanceController.getAllMaintenances);
router.get("/:id", maintenanceController.getMaintenanceById);
router.post("/", maintenanceController.createMaintenance);
router.put("/:id", maintenanceController.updateMaintenance);
router.delete("/:id", maintenanceController.deleteMaintenance);

export const maintenanceRoutes = router;