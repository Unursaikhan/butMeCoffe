// routes/profile.route.ts
import { Router } from "express";
import { postProfile } from "../controllers/profile/post-profile";
import { getProfile } from "../controllers/profile/get-profile";
import { putProfile } from "../controllers/profile/put-profile";
import { putSuccessMessage } from "../controllers/profile/put-sccessMessage";
import { getUserProfileByUsername } from "../controllers/profile/getProfileByUserName";

const profileRouter = Router();

profileRouter
  .post("/create-profile", postProfile)
  .get("/get", getProfile)
  .put("/edit", putProfile)
  .put("/success-message", putSuccessMessage)
  .get("/getProByUsername/:username", getUserProfileByUsername);

export default profileRouter;
