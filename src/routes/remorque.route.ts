import {Router} from "express";
import { remorqueController } from "../controllers/RemorqueController.js";

const route = Router();

route.get("/",remorqueController.getAllRemorques);
route.post("/",remorqueController.createRemorque)
route.post("/:id",remorqueController.getRemorqueById)
route.put("/:id",remorqueController.updateRemorque)
route.delete("/:id",remorqueController.deleteRemorque)
export const remorqueRoutes =route;


