import mongoose from "mongoose";

export default async function connectDB(){
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB connected ${conn.connection.host}`)
  } catch (error) {
    console.log("Error in database connection ",error)
  }
}