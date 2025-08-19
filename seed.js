import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/User.js";
import City from "./models/City.js";
import Car from "./models/Car.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

await mongoose.connection.dropDatabase();

const cities = await City.insertMany([{ name: "Bangalore" }, { name: "Chennai" }]);

const adminPass = await bcrypt.hash("admin123", 10);
await User.create({ name: "Admin", email: "admin@test.com", passwordHash: adminPass, role: "admin" });

const customerPass = await bcrypt.hash("cust123", 10);
await User.create({ name: "Customer", email: "cust@test.com", passwordHash: customerPass, role: "customer" });

await Car.insertMany([
  { model: "i20", brand: "Hyundai", pricePerDay: 2000, status: "available", cityId: cities[0]._id },
  { model: "Swift", brand: "Maruti", pricePerDay: 1800, status: "available", cityId: cities[1]._id }
]);

console.log("✅ Seed data inserted");
process.exit();
