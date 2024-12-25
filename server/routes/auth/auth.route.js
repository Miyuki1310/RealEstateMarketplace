import express from "express";
import { authController } from "../../controllers/index.js";
import authValidation from "../../validations/auth.validation.js";
const authRouter = express.Router();

authRouter.get("/test", authController.test);
authRouter.post("/sign-up", authValidation.signUp, authController.signUp);
export default authRouter;
