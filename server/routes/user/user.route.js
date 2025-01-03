import express from "express";
import { userController } from "../../controllers/index.js";
import multer from "multer";
import isAuth from "../../middlewares/authMiddleware.js";
const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profiles");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

userRouter.post(
  "/change-avatar",
  isAuth,
  upload.single("image"),
  userController.changeAvatar
);

userRouter.put("/update-user", isAuth, userController.updateUser);

export default userRouter;
