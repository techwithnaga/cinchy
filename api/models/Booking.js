import mongoose from "mongoose";
import MotorDetail from "./MotorDetail";
import User from "./User";
const { Schema } = mongoose;

const BookingSchema = new Schema ({
    motorId : {
        type : Schema.objectId,
        ref: MotorDetail,
        required : true 
    },
    pickupDate : {
        type : Number,
        required : true
    },
    returnDate : {
        type : Number,
        required : true
    }, 
    userId : {
        type : Schema.objectId,
        ref : User,
        required : true
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
        type : boolean,
        required : true,
        default : false
    },
    is_confirm : {
        type : boolean,
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