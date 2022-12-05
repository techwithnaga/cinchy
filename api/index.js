import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import otpRoute from "./routes/otp.js";
import motorGroupRoute from "./routes/MotorGroup.js";
import motorRoute from "./routes/Motor.js";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};

//middlewares
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/otp", otpRoute);
app.use("/api/motorGroup", motorGroupRoute);
app.use("/api/motor", motorRoute);

app.listen(8800, () => {
  connect();
  console.log("connected to the backend");
});
