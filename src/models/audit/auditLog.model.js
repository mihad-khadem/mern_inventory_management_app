import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // High-level action category
    action: {
      type: String,
      required: true,
      enum: [
        "CREATE",
        "UPDATE",
        "DELETE",
        "LOGIN",
        "LOGOUT",
        "FAILED_LOGIN",
        "PASSWORD_CHANGE",
        "ROLE_CHANGE",
        "PERMISSION_CHANGE",

        "STOCK_IN",
        "STOCK_OUT",
        "STOCK_TRANSFER",
        "STOCK_ADJUSTMENT",

        "ORDER_PLACED",
        "ORDER_CANCELLED",
        "PAYMENT_PROCESSED",
        "REFUND_ISSUED",

        "SYSTEM",
        "SECURITY",
        "OTHER",
      ],
    },

    // Functional area
    module: {
      type: String,
      required: true,
      enum: [
        "AUTH",
        "USER",
        "INVENTORY",
        "STOCK",
        "PRODUCT",
        "ORDER",
        "PAYMENT",
        "SYSTEM",
      ],
    },

    // What entity was affected
    resourceType: {
      type: String, // "Product", "Stock", "Order"
    },

    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    description: {
      type: String,
      trim: true,
    },

    before: {
      type: mongoose.Schema.Types.Mixed,
    },

    after: {
      type: mongoose.Schema.Types.Mixed,
    },

    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true }
);

// 🔑 Indexes for performance
auditLogSchema.index({ companyId: 1, createdAt: -1 });
auditLogSchema.index({ action: 1 });
auditLogSchema.index({ module: 1 });

const AuditLogModel = mongoose.model("AuditLog", auditLogSchema);
export default AuditLogModel;
