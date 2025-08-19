import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  model: String,
  brand: String,
  pricePerDay: Number,
  status: { type: String, enum: ["available", "unavailable"], default: "available" },
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City" }
});

export default mongoose.model("Car", carSchema);

