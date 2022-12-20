import mongoose from "mongoose";
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
    },
    flightNumber : {
        type : String,
    },
    hotelName : {
        type: String,
    },
    helmetQty : {
        type : Number,
        min: 0,
        max : 2
    },
    vehicleDelivered : {
        type : Boolean,
        default: false
    },
    vehicleRetured : {
        type : Boolean,
        default: false 
    }, 
    deliveryLocation :{
        type : String,
        required : true
    },
    returnedLocation : {
        type : String,
        required : true
    },
    totalRentalPrice : {
        type : Number,
        required : true
    },
    deliveryPickupPrice :{
        type : Number,
        required : true
    },
    tncDate: {
        type : Date,
    }, 
    cancelTime : {
        type : Date
    },
    is_paid : {
        type : Boolean,
        required : true,
        default : false
    },
    is_confirm : {
        type : Boolean,
        required : true,
        default : false
    },
    startingKM :{
        type : Number
    },
    endingKM : {
        type : Number
    }

}); 

export default mongoose.model("BookingSchema", BookingSchema);