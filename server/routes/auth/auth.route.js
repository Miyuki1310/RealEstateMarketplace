import express from "express";
import { authController } from "../../controllers/index.js";
import authValidation from "../../validations/auth.validation.js";
const authRouter = express.Router();

authRouter.get("/test", authController.test);
authRouter.post("/sign-up", authValidation.signUp, authController.signUp);
authRouter.post("/sign-in", authValidation.signIn, authController.signIn);
authRouter.post("/google", authController.google);
export default authRouter;
