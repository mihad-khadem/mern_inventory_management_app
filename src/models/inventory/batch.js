import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
    },
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    batchNumber: {
      type: String,
      required: true,
      trim: true,
    },
    manufactureDate: {
      type: Date,
    },
    expiryDate: {
      type: Date,
    },
    purchaseRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Purchase",
    },
    initialQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    remainingQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["active", "expired", "closed"],
      default: "active",
    },
  },
  { timestamps: true }
);

// auto-expire check
batchSchema.pre("save", function (next) {
  if (this.expiryDate && this.expiryDate < new Date()) {
    this.status = "expired";
  }
  next();
});

batchSchema.index(
  { productId: 1, warehouseId: 1, batchNumber: 1 },
  { unique: true }
);

const BatchModel = mongoose.model("Batch", batchSchema);
export default BatchModel;
