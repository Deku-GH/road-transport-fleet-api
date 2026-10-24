import { Router } from "express";
import { analyseController } from "../controllers/Analytics.Controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.get(
  "/drivers/eco-performance",
  authenticate,
  authorize("admin"),
  analyseController.getEcoPerformance,
);
router.get(
  "/tires/health-matrix",
  authenticate,
  authorize("admin"),
  analyseController.getTiresHealth,
);
router.get(
  "/trips/financial-esg",
  authenticate,
  authorize("admin"),
  analyseController.getFinancialESG,
);
export const analyseRouter = router;
