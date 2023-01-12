import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailAddress: {
      type: String,
    },
    whatsappNumber: {
      type: String,
      required: true,
    },
    emergencyContactName: {
      type: String,
    },
    emergencyContactNumber: {
      type: String,
    },
    // gender: {
    //   type: Number,
    //   required: true,
    //   min: 1,
    //   max: 3,
    //   default: 1,
    // },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    isGuest: {
      type: Boolean,
      default: true,
    },
    agreeMarketing: {
      type: Boolean,
      default: true,
    },
    hearAboutUs: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
