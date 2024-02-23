import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB configured on ${conn.connection.host}`.cyan.rainbow);
  } catch (error) {
    console.log(error.message);
  }
};
