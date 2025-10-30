// models/counter/counter.model.js
import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // e.g., company_model
  sequence_value: { type: Number, default: 0 },
});

const CounterModel = mongoose.model("Counter", CounterSchema);
export default CounterModel;
