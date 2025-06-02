import { Router } from "express";
import { postBank } from "../controllers/bank-card/post-bankcard";
import { putBank } from "../controllers/bank-card/put-bankcard";
import { getUserBankcard } from "../controllers/bank-card/get-userbankcard";

const bankRouter = Router();

bankRouter.post("/add-bank", postBank).put("/:id", putBank);
bankRouter.get("/user/:userId", getUserBankcard);

export default bankRouter;
