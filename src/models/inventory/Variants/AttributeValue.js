import mongoose from "mongoose";

const attributeValueSchema = new mongoose.Schema(
  {
    attributeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attribute",
      required: true,
    },
    value: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

attributeValueSchema.index({ attributeId: 1, value: 1 }, { unique: true });

const AttributeValueModel = mongoose.model(
  "AttributeValue",
  attributeValueSchema
);
export default AttributeValueModel;
