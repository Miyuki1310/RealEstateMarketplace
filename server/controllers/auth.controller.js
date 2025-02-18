import { createCustomError } from "../error/customError.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { authService } from "../services/index.js";

class AuthController {
  async test(req, res, next) {
    return res.json({ message: "Auth route" });
  }
  signUp = asyncWrapper(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const newUser = await authService.signUp(username, email, password);
    return res.status(201).json({ user: newUser });
  });

  signIn = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    const { token, user } = await authService.signIn(email, password);
    res.cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    const { password: pass, ...rest } = user;
    return res.status(200).json({ user: rest });
  });

  google = asyncWrapper(async (req, res) => {
    const { name, email, avatar } = req.body;
    const { token, user } = await authService.google(name, email, avatar);
    res.cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    return res.status(200).json({ user });
  });

  signOut = asyncWrapper(async (req, res) => {
    res.clearCookie("access_token");
    return res.status(200).json({ message: "Sign out successfully" });
  });
}
const authController = new AuthController();
export default authController;
