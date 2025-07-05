import express from "express";
import { getAllUsers } from "../controllers/user/get-all-user";

const userRouter = express.Router();

userRouter.get("/all", getAllUsers);

export default userRouter;
