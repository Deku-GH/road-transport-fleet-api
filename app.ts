import "dotenv/config";
import express from "express";

import Database from "./src/config/Database.js";
import { Authrouter } from "./src/routes/Auth.route.js";
import { comionRoutes } from "./src/routes/comion.route.js";
import userRoutes from "./src/routes/user.route.js";
import {remorqueRoutes}  from "./src/routes/remorque.route.js"
import {trajetRoutes} from "./src/routes/Trajet.route.js";
import {missionRoutes} from "./src/routes/Mission.route.js";
import {pneuRoutes} from "./src/routes/Pneu.route.js";
import {maintenanceRoutes} from "./src/routes/Maintenance.route.js";
import cors from "cors"
const app = express();

const database = new Database();

console.log("Connecting to MongoDB...");

await database.connect();

console.log("MongoDB connected!");

app.use(cors({origin:'http://localhost:5173'}))

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("he mouad");
});

app.use("/api/auth", Authrouter);
app.use("/api/users", userRoutes);
app.use("/api/comion", comionRoutes);
app.use("/api/remorques",remorqueRoutes)
app.use("/api/trajets", trajetRoutes);
app.use("/api/missions", missionRoutes);
app.use("/api/pneus", pneuRoutes);
app.use("/api/maintenances", maintenanceRoutes);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
