import express from "express";
import userRouter from "./user/user.route.js";
import authRouter from "./auth/auth.route.js";
import listRouter from "./listing/listing.route.js";
const router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/listing", listRouter);
export default router;
