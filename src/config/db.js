import mongoose from "mongoose";
import config from "./index.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.databaseURL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default connectDB;
