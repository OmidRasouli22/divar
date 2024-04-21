import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../modules/user/user.model.js";

export const auth = async (req, res, next) => {
  try {
    const token = req?.cookies?.access_token;
    if (!token || token.length === 0) {
      throw new createHttpError.Unauthorized("Please login first");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!payload) {
      throw new createHttpError.Unauthorized("invalid token");
    }
    const user = await User.findById(payload._id, {
      accessToken: 0,
      otp: 0,
    }).lean();
    if (!user) {
      throw new createHttpError.Unauthorized("invalid token");
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
