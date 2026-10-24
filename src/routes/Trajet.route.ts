import { Router } from "express";
import { trajetController } from "../controllers/TrajetController.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

import { apiLimiter } from "../config/rateLimiter.js";
import { apiSlowDown } from "../config/slowDown.js";
const router = Router();


router.get(
  "/",
  apiSlowDown,
  apiLimiter, authenticate,
  authorize("admin"),
  trajetController.getAllTrajets,
);
router.get("/:id", authenticate,
  authorize("admin"), trajetController.getTrajetById);
router.post(
  "/",
  authenticate,
  authorize("admin"),
  trajetController.createTrajet,
);
router.put("/:id", trajetController.updateTrajet);
router.delete("/:id", trajetController.deleteTrajet);

export const trajetRoutes = router;
