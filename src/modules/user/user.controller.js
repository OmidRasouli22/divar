import autoBind from "auto-bind";
import createHttpError from "http-errors";
import User from "./user.model.js";

class UserController {
  #service;
  constructor() {
    autoBind(this);
  }

  async getMe(req, res, next) {
    req.user;
    if (!req.user) throw new createHttpError.NotFound("No user found");
    const user = await User.findById(req.user._id, {
      accessToken: 0,
      otp: 0,
      __v: 0,
      updatedAt: 0,
    });
    if (!user) throw new createHttpError.NotFound("No user found");
    return res.status(200).json({
      message: "user info",
      data: {
        user,
      },
    });
    try {
    } catch (error) {
      next(error);
    }
  }
}
const userController = new UserController();
export default userController;
