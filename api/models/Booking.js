import mongoose from "mongoose";
import Motor from "./Motor.js";
import MotorGroup from "./MotorGroup.js";
import DeliveryFee from "./DeliveryFee.js";
import User from "./User.js";
const { Schema } = mongoose;

const BookingSchema = new Schema(
  {
    motorGroup: {
      type: String,
    },
    motor: {
      type: String,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    },
    flightNumber: {
      type: String,
    },
    hotelName: {
      type: String,
    },
    helmetQty: {
      type: Number,
      min: 0,
      max: 2,
    },
    vehicleDelivered: {
      type: Boolean,
      default: false,
    },
    vehicleRetured: {
      type: Boolean,
      default: false,
    },
    deliveryLocation: {
      type: String,
    },
    returnedLocation: {
      type: String,
    },
    totalRentalPrice: {
      type: Number,
      required: true,
    },
    deliveryPickupFee: {
      type: Number,
      required: true,
    },
    tncDate: {
      type: Date,
    },
    cancelTime: {
      type: Date,
    },
    is_paid: {
      type: Boolean,
      default: false,
    },
    is_confirm: {
      type: Boolean,
      default: false,
    },
    startingKM: {
      type: Number,
    },
    endingKM: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BookingSchema", BookingSchema);
