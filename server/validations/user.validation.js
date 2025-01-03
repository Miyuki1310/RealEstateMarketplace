import { CustomAPIError } from "../error/customError.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

const schema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6),
  confirmPassword: Joi.ref("password"),
});

class UserValidation {
  changeAvatar = asyncWrapper((req, res, next) => {
    if (!req.file) {
      throw new CustomAPIError("There are some error when uploading", 400);
    }
    next();
  });

  updateUser = asyncWrapper((req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new CustomAPIError(error.message, 400);
    }
    next();
  });
}

const userValidation = new UserValidation();
export default userValidation;
