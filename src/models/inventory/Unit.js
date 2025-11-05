import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    symbol: String,
    conversionFactor: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const UnitModel = mongoose.model("Unit", unitSchema);
export default UnitModel;
