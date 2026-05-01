import mongoose from "mongoose";
export const connectDB = async (): Promise<void> => {
  try {
    const url = process.env.MONGO_URL;
    if (!url) {
      throw new Error("Không thể truy cập Database");
    }
    await mongoose.connect(url);
    console.log("Connect Success!");
  } catch (error) {
    console.log("Connect Error!");
  }
};
