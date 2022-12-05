import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import otpRoute from "./routes/otp.js";
import motorGroupRoute from "./routes/MotorGroup.js";
import motorRoute from "./routes/Motor.js";
import cors from "cors";
import DeliveryFee from "./models/DeliveryFee.js";
import deliveryFeeRoute from "./routes/DeliveryFee.js";

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
<<<<<<< HEAD
app.use("/api/motor", motorRoute);
=======
app.use("/api/motorDetail", motorDetailRoute);
app.use("/api/deliveryFee", deliveryFeeRoute);
>>>>>>> 016c8138848d660a3580c1a817720d95d0c8a7b6

app.listen(8800, () => {
  connect();
  console.log("connected to the backend");
});
