import mongoose from "mongoose";

const warrantySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    durationInDays: Number,
    description: String,
  },
  { timestamps: true }
);

const WarrantyModel = mongoose.model("Warranty", warrantySchema);
export default WarrantyModel;
