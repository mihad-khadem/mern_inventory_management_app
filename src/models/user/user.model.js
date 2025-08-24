import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // ❌ never return password unless explicitly selected
    },
    role: {
      type: String,
      default: "staff",
      enum: ["admin", "manager", "staff"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
