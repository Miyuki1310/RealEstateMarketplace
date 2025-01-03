import { CustomAPIError } from "../error/customError.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { User } from "../models/index.js";

class UserService {
  async changeAvatar(userId, avatar) {
    const newUser = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    ).lean();
    if (!newUser) {
      throw new CustomAPIError("User not found", 404);
    }
    return newUser;
  }
}

const userService = new UserService();
export default userService;
