import "dotenv/config";
import express from "express";
import Database from "./src/config/Database.js";
import {userController} from "./src/controllers/UserController.js"
const app = express();
const database = new Database();
await database.connect();

app.use(express.json());
app.get("/",(req,res)=>{
    res.status(200).json("he mouad")
}   );
app.post("/create",userController.createUser   );


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log( `You are the radoi Hz ${PORT}`);
});
