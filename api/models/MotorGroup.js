import mongoose from "mongoose";
const { Schema } = mongoose;

const motorGroupSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  photos: [
    {
      type: String,
    },
  ],
  description: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  count: {
    type: String,
  },
  bookedTime: [
    {
      bookingId: { type: Schema.ObjectId },
      startDate: { type: Number },
      endDate: { type: Number },
    },
  ],
});

export default mongoose.model("MotorGroup", motorGroupSchema);
