import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";

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

app.use("/api/user", userRoute);

app.listen(8800, () => {
  connect();
  console.log("connected to the backend");
});
