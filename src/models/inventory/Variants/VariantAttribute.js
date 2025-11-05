import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: String,
    isGlobal: { type: Boolean, default: false }, // true = used by all products
  },
  { timestamps: true }
);

attributeSchema.index({ name: 1 });

const AttributeModel = mongoose.model("Attribute", attributeSchema);
export default AttributeModel;
