import { Router } from "express";
import { comionController } from "../controllers/ComionController.js";

const route = Router();
route.get("/", comionController.getAllComions);
route.post("/", comionController.createComion);
route.post("/:id", comionController.getComionById);
route.put("/:id", comionController.updateComion);
route.delete("/:id", comionController.deleteComion);
export const comionRoutes = route;
