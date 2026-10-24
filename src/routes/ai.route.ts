import { Router } from "express";

import { analyzeTrip } from "../controllers/aiTripController.js";
const route = Router();


const router = Router();

router.get("/:id/analyze", analyzeTrip);

export const AIROUTE = router;