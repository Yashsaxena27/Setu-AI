import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ MongoDB Connected");
  } catch (error: any) {
    console.log(process.env.MONGO_URI);
    console.error("❌ MongoDB Connection Failed");
    console.error(error.name);
    console.error(error.message);
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;