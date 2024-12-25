import { CustomAPIError } from "../error/customError.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import Joi from "joi";
import { User } from "../models/index.js";
const schema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

class AuthValidation {
  signUp = asyncWrapper(async (req, res, next) => {
    const { error } = schema.validate(req.body);
    const { email, username } = req.body;
    if (error) {
      throw new CustomAPIError(error.message, 400);
    }
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    }).lean();
    if (existingUser) {
      throw new CustomAPIError("User already exists", 400);
    }
    next();
  });
}

const authValidation = new AuthValidation();
export default authValidation;
