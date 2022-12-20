import mongoose from "mongoose";
const { Schema } = mongoose;

const DeliveryFeeSchema = new Schema(
  {
    region: {
      type: String,
      required: true,
    },

    fee: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("DeliveryFee", DeliveryFeeSchema);
