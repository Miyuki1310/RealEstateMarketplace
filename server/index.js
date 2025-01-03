import express from "express";
import {} from "dotenv/config";
import connectDB from "./db/connectDB.js";
import router from "./routes/index.js";
import notFound from "./middlewares/not-found.js";
import handleError from "./middlewares/handleError.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads/profiles", express.static("./uploads/profiles"));
app.use("/api", router);
app.use(notFound);
app.use(handleError);
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
