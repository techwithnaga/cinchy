import mongoose from "mongoose";
<<<<<<< HEAD
import MotorDetail from "./MotorDetail.js";
import User from "./User.js";
const { Schema } = mongoose;

const BookingSchema = new Schema ({
    motor: {
        type: Schema.ObjectId,
        ref: MotorDetail,
        required: true,
      },
    pickupDate : {
        type : Number,
        required : true
    },
    returnDate : {
        type : Number,
        required : true
    }, 
    user: {
        type: Schema.ObjectId,
        ref: User,
        required: true,
      },
    comments : {
        type : String,
        required : true
=======
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
>>>>>>> 08656ecd6edbcb5d1de67896747af4bdde76d442
    },
    rentalDuration: {
      type: Number,
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
    vehicleRetuned: {
      type: Boolean,
      default: false,
    },
    deliveryLocation: {
      type: String,
    },
    deliveryURL: {
      type: String,
    },
    returnLocation: {
      type: String,
    },
    returnURL: {
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
<<<<<<< HEAD
    is_paid : {
        type : Boolean,
        required : true,
        default : false
    },
    is_confirm : {
        type : Boolean,
        required : true,
        default : false
=======
    cancelTime: {
      type: Date,
    },
    is_paid: {
      type: Boolean,
      default: false,
>>>>>>> 08656ecd6edbcb5d1de67896747af4bdde76d442
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
