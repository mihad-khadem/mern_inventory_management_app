import mongoose from "mongoose";
// Stock Model Schema
const stockSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
    quantity: { type: Number, default: 0 },
    reservedQty: { type: Number, default: 0 },
    avgCostPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

stockSchema.index(
  { companyId: 1, warehouseId: 1, productId: 1 },
  { unique: true }
);

const StockModel = mongoose.model("Stock", stockSchema);
export default StockModel;
