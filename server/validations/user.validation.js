import { CustomAPIError } from "../error/customError.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

class UserValidation {
  changeAvatar = asyncWrapper((req, res, next) => {
    if (!req.file) {
      throw new CustomAPIError("There are some error when uploading", 400);
    }
    next();
  });
}

const userValidation = new UserValidation();
export default userValidation;
