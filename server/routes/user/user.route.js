import express from "express";
import { userController } from "../../controllers/index.js";
const userRouter = express.Router();

userRouter.get("/test", userController.test);

export default userRouter;
