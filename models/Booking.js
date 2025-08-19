import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  startDate: Date,
  endDate: Date,
  totalPrice: Number
});

export default mongoose.model("Booking", bookingSchema);

