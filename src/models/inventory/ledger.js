import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" },
    batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
    transactionType: {
      type: String,
      enum: [
        "purchase",
        "sale",
        "adjustment",
        "transfer_in",
        "transfer_out",
        "return",
      ],
      required: true,
    },
    referenceType: String,
    referenceId: String,
    quantity: Number,
    unitCost: Number,
    totalCost: Number,
    beforeQty: Number,
    afterQty: Number,
    remarks: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

ledgerSchema.index({ productId: 1, warehouseId: 1, createdAt: -1 });

const LedgerModel = mongoose.model("Ledger", ledgerSchema);
export default LedgerModel;
