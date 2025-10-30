import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      default: "user",
      enum: ["super-admin", "admin", "manager", "staff", "customer", "user"],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    // For multi-tenant
    company: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
