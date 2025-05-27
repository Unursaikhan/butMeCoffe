// routes/profile.route.ts
import { Router } from "express";
import { postProfile } from "../controllers/profile/post-profile";
import { getProfile } from "../controllers/profile/get-profile";

const profileRouter = Router();

profileRouter.post("/create-profile", postProfile).get("/get", getProfile);

export default profileRouter;
