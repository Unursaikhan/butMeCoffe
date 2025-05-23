import { getMe } from "@/controllers/auth/get-auth-refresh";
import { Router } from "express";
const authRouter = Router;
authRouter.get("/refresh", getMe);
