import express from "express";
import Car from "../models/Car.js";

const router = express.Router();

// customer view - available cars by city
router.get("/", async (req, res) => {
  const { cityId, status } = req.query;
  const filter = {};
  if (cityId) filter.cityId = cityId;
  if (status) filter.status = status;
  const cars = await Car.find(filter).populate("cityId");
  res.json(cars);
});

// admin - add car
router.post("/", async (req, res) => {
  const car = new Car(req.body);
  await car.save();
  res.json(car);
});

// admin - update car
router.patch("/:id", async (req, res) => {
  const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(car);
});

export default router;

