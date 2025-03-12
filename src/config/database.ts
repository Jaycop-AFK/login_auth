import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const { MONGODB_URI } = process.env;

export const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGODB_URI!);
    console.log("Successfully connected to database");
  } catch (error) {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  }
}



