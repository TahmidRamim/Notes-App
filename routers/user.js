import express from "express";
import { createUser } from "../controllers/userControllers/createUser.js";
import { getUser } from "../controllers/userControllers/getUser.js";
import { Login } from "../controllers/userControllers/login.js";
export const userRouter = express.Router();
userRouter.post("/create", createUser);
userRouter.post("/login", Login);
userRouter.get("/:id", getUser);
