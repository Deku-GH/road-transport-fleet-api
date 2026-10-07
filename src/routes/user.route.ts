import { Router } from "express";
import  {userController}  from "../controllers/UserController.js";

const userRoutes = Router();

userRoutes.get("/", userController.getAllUsers);

userRoutes.get("/:id", userController.getUserById);
    
userRoutes.put("/:id", userController.updateUser);

userRoutes.delete("/:id", userController.deleteUser);

export default userRoutes;
