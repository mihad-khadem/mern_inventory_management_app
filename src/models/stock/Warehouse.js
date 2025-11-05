import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    address: String,
    contactPerson: String,
    type: { type: String, enum: ["main", "branch"], default: "main" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

const WarehouseModel = mongoose.model("Warehouse", warehouseSchema);
export default WarehouseModel;
