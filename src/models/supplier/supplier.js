import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    name: { type: String, required: true, trim: true },
    contactPerson: String,
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    address: String,
    taxNumber: String,
    balance: { type: Number, default: 0 }, // running balance if you track payables
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

supplierSchema.index({ companyId: 1, name: 1 }, { unique: true });

export default mongoose.model("Supplier", supplierSchema);
