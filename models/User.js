import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City" }
});

export default mongoose.model("User", userSchema);
