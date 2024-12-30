import { CustomAPIError } from "../error/customError.js";
import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

  async signIn(email, password) {
    const validUser = await User.findOne({ email }).lean();
    if (!validUser) {
      throw new CustomAPIError("Email or password is wrong", 400);
    }

    const token = await jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );
    return { token, user: validUser };
  }
}

const authService = new AuthService();
export default authService;
