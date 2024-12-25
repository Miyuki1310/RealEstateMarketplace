import { CustomAPIError } from "../error/customError.js";
import { User } from "../models/index.js";
import bcrypt from "bcryptjs";

class AuthService {
  async signUp(username, email, password) {
    console.log("signUp");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log(newUser);
    if (!newUser) {
      throw new CustomAPIError("User could not be created", 400);
    }
    return newUser;
  }
}

const authService = new AuthService();
export default authService;
