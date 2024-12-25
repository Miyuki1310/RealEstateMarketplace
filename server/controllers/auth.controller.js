import { User } from "../models/index.js";

class AuthController {
  async test(req, res) {
    return res.json({ message: "Auth route" });
  }
  async signUp(req, res) {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });
    return res.status(200).json({ message: "User created", user: newUser });
  }
}
const authController = new AuthController();
export default authController;
