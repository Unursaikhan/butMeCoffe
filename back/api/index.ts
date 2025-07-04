// index.ts
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import authRouter from "../src/routes/auth.route";
import profileRouter from "../src/routes/profile.route";
import bankRouter from "../src/routes/bank.route";
import dontaionRouter from "../src/routes/dontaion.route";
import userRouter from "../src/routes/user.route";

config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/bank", bankRouter);
app.use("/donation", dontaionRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
