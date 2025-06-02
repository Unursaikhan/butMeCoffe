import { Router } from "express";
import { getMe } from "../controllers/auth/get-auth-refresh";
import { postAuthSignup } from "../controllers/auth/post-auth-signup";
import { postAuthSignin } from "../controllers/auth/post-auth-signin";
import { usernameExists } from "../controllers/auth/post-usernameExists";
import { authenticationMiddleware } from "../middlewares/authentication-middleware";
import { changePassword } from "../controllers/auth/auth-change-password";

const authRouter = Router();

authRouter
  .get("/refresh", authenticationMiddleware, getMe)
  .post("/sign-in", postAuthSignin)
  .post("/sign-up", postAuthSignup)
  .post("/user-exists", usernameExists)
  .put("/change-password", changePassword);

export default authRouter;
