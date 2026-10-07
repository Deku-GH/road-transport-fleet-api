import "dotenv/config";
import express from "express";
import Database from "./src/config/Database.js";
import { Authrouter } from "./src/routes/Auth.route.js";
import { comionRoutes } from "./src/routes/comion.route.js";
import userRoutes from "./src/routes/user.route.js";
const app = express();

const database = new Database();
await database.connect();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("he mouad");
});

app.use("/api/auth", Authrouter);
app.use("/api/users", userRoutes);
app.use("/api/comion", comionRoutes);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`You are the radoi Hz ${PORT}`);
});

export default app;
