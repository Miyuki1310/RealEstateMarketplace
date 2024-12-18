import mongoose from "mongoose";
const connectDB = async (url) => {
  return await mongoose.connect(url).then(() => {
    console.log("Connected to the database");
  });
};

export default connectDB;
