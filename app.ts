import "dotenv/config";
import express from "express";
import { NextFunction, Request, Response } from "express";
import Database from "./src/config/Database.js";
import v1Router from "./src/routes/V1/index.js";

import cors from "cors";
import authRoutesV2 from "./src/routes/V2/Auth.Routes.js";
import { AIROUTE } from "./src/routes/ai.route.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./src/config/swagger.js";
import v2Route from "./src/routes/V2/index.js";
const app = express();

const database = new Database();

console.log("Connecting to MongoDB...");

await database.connect();

console.log("MongoDB connected!");

app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("he mouad");
});
app.use("/api/ai/trajet", AIROUTE);
app.use("/api/v2", v2Route);
app.use("/api/v1", v1Router);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  res.status(500).json({
    message: "Internal server error",
  });
});
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
