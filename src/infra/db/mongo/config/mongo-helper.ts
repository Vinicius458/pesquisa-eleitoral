import mongoose from "mongoose";
import env from "@/main/config/env";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.dbUrl);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
