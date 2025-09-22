import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://divya73908_db_user:Divya123@cluster0.6zrfht4.mongodb.net/TaskBoard")
    .then(()=>console.log("MongoDB connected"));
  } catch (error) {
    console.log(error);
  }
}