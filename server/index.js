import express from "express";
import {} from "dotenv/config";
import connectDB from "./db/connectDB.js";
const app = express();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(8080, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};
start();
