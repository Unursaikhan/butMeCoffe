// index.ts
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route";
import profileRouter from "./routes/profile.route";
import { config } from "dotenv";
import bankRouter from "./routes/bank.route";
import dontaionRouter from "./routes/dontaion.route";
import userRouter from "./routes/user.route";

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
