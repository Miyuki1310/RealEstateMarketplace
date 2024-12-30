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

  async google(name, email, avatar) {
    const existUser = await User.findOne({ email }).lean();
    if (existUser) {
      const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = existUser;
      return { token, user: rest };
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + "aA1!";
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = await User.create({
        username: name.split("").join("").toLowerCase(), 
        email,
        password: hashedPassword,
        avatar,
      });
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser;
      return { token, user: rest };
    }
  }
}

const authService = new AuthService();
export default authService;
