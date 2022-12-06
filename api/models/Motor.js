import mongoose from "mongoose";
const { Schema } = mongoose;
import MotorGroup from "./MotorGroup.js";

const motorSchema = new Schema({
  motorCategory: {
    type: Schema.ObjectId,
    ref: MotorGroup,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  STNKmonth: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  color: {
    type: String,
    required: true,
  },
  kilometers: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Motor", motorSchema);
