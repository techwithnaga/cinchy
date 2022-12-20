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
},  { timestamps: true });

<<<<<<< HEAD:api/models/MotorDetail.js
export default mongoose.model("MotorDetail", motorDetail);
=======
export default mongoose.model("Motor", motorSchema);
>>>>>>> 08656ecd6edbcb5d1de67896747af4bdde76d442:api/models/Motor.js
