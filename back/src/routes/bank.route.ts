import { Router } from "express";
import { postBank } from "../controllers/bank-card/post-bankcard";

const bankRouter = Router();

bankRouter.post("/add-bank", postBank);

export default bankRouter;
