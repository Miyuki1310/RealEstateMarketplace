import { CustomAPIError } from "../error/customError.js";
import bcrypt from "bcryptjs";
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

  async updateUser(username, email, password, confirmPassword, userId) {
    if (password && confirmPassword) {
      const newPassword = await bcrypt.hash(password, 10);
      const newUser = await User.findByIdAndUpdate(
        userId,
        {
          username,
          email,
          password: newPassword,
        },
        { new: true }
      ).lean();
      console.log("update password");
      if (!newUser) {
        throw new CustomAPIError("Cannot update user", 404);
      }
      return newUser;
    } else {
      console.log(username, email);

      const newUser = await User.findOneAndUpdate(
        { _id: userId },
        {
          username,
          email,
        },
        { new: true }
      ).lean();
      console.log("update not password");

      if (!newUser) {
        throw new CustomAPIError("Cannot update user", 404);
      }
      return newUser;
    }
  }
}

const userService = new UserService();
export default userService;
