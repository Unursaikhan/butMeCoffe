import { Router } from "express";
import { postDonation } from "../controllers/donations/post-donation";
import { getDonations } from "../controllers/donations/get-donation";
import { getMyDonations } from "../controllers/donations/get-mydonations";
import { getRecentDonations } from "../controllers/donations/get-recent-donation";

const dontaionRouter = Router();

dontaionRouter
  .post("/donate", postDonation)
  .get("/get", getDonations)
  .get("/getMy", getMyDonations)
  .get("/recent/:userId", getRecentDonations);

export default dontaionRouter;
