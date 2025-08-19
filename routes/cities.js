import express from "express";
import City from "../models/City.js";

const router = express.Router();

router.get("/", async (_, res) => {
  const cities = await City.find();
  res.json(cities);
});

export default router;

