import express from "express";
import { authController } from "../../controllers/index.js";
const authRouter = express.Router();

authRouter.get("/test", authController.test);
authRouter.post("/sign-up", authController.signUp);
export default authRouter;
