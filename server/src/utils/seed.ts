import dotenv from "dotenv";
import connectDB from "../config/db";
import User from "../models/user";

dotenv.config();

const seed = async () => {
  await connectDB();

  const user = await User.create({
    name: "Test User",
    email: "test@test.com",
    password: "123456",
    demographics: {
      age: 22,
      state: "Uttar Pradesh",
      district: "Rampur",
      income_bracket: "Low",
    },
    occupation: "Student",
    disability_status: false,
    education_level: "Engineering",
    language_preference: "English",
    phone_whatsapp: "9999999999",
    consent_given: true,
    consent_timestamp: new Date(),
  });

  console.log(user);

  process.exit();
};

seed();