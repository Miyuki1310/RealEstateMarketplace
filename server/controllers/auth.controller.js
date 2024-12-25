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
}
const authController = new AuthController();
export default authController;
