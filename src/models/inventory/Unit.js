import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    shortName: { type: String, required: true, trim: true },
    symbol: String,
    description: String,
    isActive: { type: Boolean, default: true },

    conversionFactor: { type: Number, default: 1 },
  },
  { timestamps: true }
);
// unit conversion
const unitConversionSchema = new mongoose.Schema(
  {
    fromUnit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
    toUnit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
    factor: {
      type: Number,
      required: true,
      min: 0,
    },
    description: String,
  },
  { timestamps: true }
);

unitConversionSchema.index({ fromUnit: 1, toUnit: 1 }, { unique: true });

const UnitConversionModel = mongoose.model(
  "UnitConversion",
  unitConversionSchema
);

const UnitModel = mongoose.model("Unit", unitSchema);
export default { UnitModel, UnitConversionModel };
