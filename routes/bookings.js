import express from "express";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import { calcTotalPrice } from "../utils/pricing.js";

const router = express.Router();

// helper: check if two date ranges overlap
function isOverlap(start1, end1, start2, end2) {
  return new Date(start1) <= new Date(end2) && new Date(start2) <= new Date(end1);
}

// customer - my bookings
router.get("/me/:customerId", async (req, res) => {
  const bookings = await Booking.find({ customerId: req.params.customerId })
    .populate("carId")
    .populate("cityId");
  res.json(bookings);
});

// customer - create booking
router.post("/", async (req, res) => {
  const { carId, startDate, endDate, customerId, cityId } = req.body;

  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({ message: "Invalid date range" });
  }
  
  // admin - all bookings (filter by city)
router.get("/", async (req, res) => {
  const filter = {};
  if (req.query.cityId) filter.cityId = req.query.cityId;
  const bookings = await Booking.find(filter)
    .populate("carId")
    .populate("customerId")
    .populate("cityId");
  res.json(bookings);
});


  const car = await Car.findById(carId);
  if (!car || car.status !== "available") {
    return res.status(400).json({ message: "Car not available" });
  }

  // check overlap with existing bookings
  const existing = await Booking.find({ carId });
  for (let b of existing) {
    if (isOverlap(startDate, endDate, b.startDate, b.endDate)) {
      return res.status(400).json({ message: "Car already booked in this period" });
    }
  }

  // calculate price
  const totalPrice = calcTotalPrice(startDate, endDate, car.pricePerDay);

  const booking = new Booking({
    carId,
    customerId,
    startDate,
    endDate,
    totalPrice,
    cityId,
  });

  await booking.save();
  res.json(booking);
});

export default router;
