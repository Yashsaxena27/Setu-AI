import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import Scheme from "../models/Scheme";

dotenv.config();

console.log("MONGO_URI =", process.env.MONGO_URI);
console.log("NODE_ENV =", process.env.NODE_ENV);

async function seedSchemes() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const filePath = path.join(__dirname, "../data/schemes.json");

    const rawData = fs.readFileSync(filePath, "utf-8");

    const schemes = JSON.parse(rawData);

    await Scheme.deleteMany({});

    await Scheme.insertMany(schemes);

    console.log(`✅ ${schemes.length} schemes inserted successfully`);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedSchemes();