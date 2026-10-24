
import { Router } from "express";

import { Authrouter } from "../Auth.route.js";
import { comionRoutes } from "../comion.route.js";
import userRoutes from "../user.route.js";
import { remorqueRoutes } from "../remorque.route.js";
import { trajetRoutes } from "../Trajet.route.js";
import { missionRoutes } from "../Mission.route.js";
import { pneuRoutes } from "../Pneu.route.js";
import { maintenanceRoutes } from "../Maintenance.route.js";

const v1Router = Router();

v1Router.use("/auth", Authrouter);
v1Router.use("/users", userRoutes);
v1Router.use("/comion", comionRoutes);
v1Router.use("/remorques", remorqueRoutes);
v1Router.use("/trajets", trajetRoutes);
v1Router.use("/missions", missionRoutes);
v1Router.use("/pneus", pneuRoutes);
v1Router.use("/maintenances", maintenanceRoutes);

export default v1Router;
