class UserController {
  async test(req, res) {
    return res.json({ message: "User route" });
  }
}

const userController = new UserController();

export default userController;
