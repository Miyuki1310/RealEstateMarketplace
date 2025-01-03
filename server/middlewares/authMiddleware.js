import { CustomAPIError } from "../error/customError.js";
import asyncWrapper from "./asyncWrapper.js";
import jwt from "jsonwebtoken";
const isAuth = asyncWrapper(async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    throw new CustomAPIError("Authentication required", 401);
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded.id;
  next();
});

export default isAuth;
