import express from "express";
import {} from "dotenv/config";
import connectDB from "./db/connectDB.js";
import router from "./routes/index.js";
const app = express();

app.use(express.json());
app.use("/api", router);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  } catch (error) {
    console.error(error);
  }
};
start();
