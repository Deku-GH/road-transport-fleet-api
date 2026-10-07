import mongoose from "mongoose";

const uri = "mongodb://127.0.0.1:27018/road_transport_fleet_test";

console.log("1️⃣ Starting connection...");

try {
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });

  console.log("2️⃣ MongoDB connected successfully!");

  await mongoose.disconnect();

  console.log("3️⃣ MongoDB disconnected successfully!");
} catch (error) {
  console.error("❌ MongoDB connection failed:");
  console.error(error);
}