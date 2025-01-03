import asyncWrapper from "../middlewares/asyncWrapper.js";
import userService from "../services/user.service.js";

class UserController {
  async test(req, res) {
    return res.json({ message: "User route" });
  }

  changeAvatar = asyncWrapper(async (req, res) => {
    const userId = req.user;
    const avatar = `uploads/profiles/${req.file.filename}`;
    console.log(userId, avatar);
    const newUser = await userService.changeAvatar(userId, avatar);
    const { password, ...user } = newUser;
    return res.status(200).json({ user: user });
  });
}

const userController = new UserController();

export default userController;
