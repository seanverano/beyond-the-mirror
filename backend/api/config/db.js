import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("API DB Connected");
  } catch (error) {
    console.log("Error connecting to API DB:", error);
    process.exit(1);
  }
};

export default connectDB;
