import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    sku: { type: String, required: true, unique: true },
    barcode: { type: String, unique: true, sparse: true },
    attributes: [
      {
        attributeId: { type: mongoose.Schema.Types.ObjectId, ref: "Attribute" },
        valueId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AttributeValue",
        },
      },
    ],
    costPrice: { type: Number, default: 0 },
    sellingPrice: { type: Number, default: 0 },
    stockTrack: { type: Boolean, default: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

variantSchema.index({ productId: 1 });
variantSchema.index({ sku: 1 });

const VariantModel = mongoose.model("Variant", variantSchema);
export default VariantModel;
