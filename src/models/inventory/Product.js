import e from "express";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    sku: { type: String, unique: true, sparse: true },
    barcode: { type: String, unique: true, sparse: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
    warrantyId: { type: mongoose.Schema.Types.ObjectId, ref: "Warranty" },
    variants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Variant" }],
    attributes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attribute" }],
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
    description: String,
    costPrice: { type: Number, default: 0 },
    sellingPrice: { type: Number, default: 0 },
    taxRate: { type: Number, default: 0 },
    reorderLevel: { type: Number, default: 0 },
    trackBatch: { type: Boolean, default: false },
    trackSerial: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

productSchema.index({ name: 1, companyId: 1 });
productSchema.index({ sku: 1, companyId: 1 });

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
