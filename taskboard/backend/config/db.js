import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://divya73908_db_user:Divya@2001@cluster0.6zrfht4.mongodb.net/Taskflow")
    .then(()=>console.log("MongoDB connected"));
  } catch (error) {
    console.log(error);
  }
}