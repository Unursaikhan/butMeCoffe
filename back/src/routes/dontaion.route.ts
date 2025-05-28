import { Router } from "express";
import { postDonation } from "../controllers/donations/post-donation";
import { getDonations } from "../controllers/donations/get-donation";
import { getMyDonations } from "../controllers/donations/get-mydonations";

const dontaionRouter = Router();

dontaionRouter
  .post("/donate", postDonation)
  .get("/get", getDonations)
  .get("/getMy", getMyDonations);

export default dontaionRouter;
