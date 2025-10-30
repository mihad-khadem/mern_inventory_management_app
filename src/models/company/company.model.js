import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      unique: true,
      sparse: true, // Optional short code for quick access (e.g., "ABC_POS")
    },
    domain: {
      type: String,
      unique: true,
      sparse: true, // for multi-tenant domain routing (e.g., abc.posapp.com)
    },
    contactEmail: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    plan: {
      type: String,
      enum: ["free", "basic", "pro", "enterprise"],
      default: "free",
    },
    status: {
      type: String,
      enum: ["active", "suspended", "inactive"],
      default: "active",
    },
    subscription: {
      startDate: Date,
      endDate: Date,
      renewsAutomatically: { type: Boolean, default: true },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // the user who created the company
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", CompanySchema);
