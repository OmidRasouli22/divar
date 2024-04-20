import autoBind from "auto-bind";
import User from "../user/user.model.js";
import createHttpError from "http-errors";
import AuthMessages from "./auth.messages.js";
import { randomInt } from "crypto";

class AuthService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = User;
  }

  async sendOTP(mobile) {
    const user = await this.#model.findOne({ mobile });
    const now = new Date().getTime();
    const userOtp = {
      code: randomInt(10000, 99999),
      expiresIn: now + 1000 * 60 * 2,
    };
    if (!user) {
      const newUser = this.#model.create({
        mobile,
        otp: userOtp,
      });
      return newUser;
    }

    if (user.otp && user.otp.expiresIn > now) {
      throw new createHttpError.BadRequest(AuthMessages.OTPCodeNotExpired);
    }

    user.otp = userOtp;
    await user.save();

    return user;
  }

  async checkOTP(mobile, code) {}

  async logout() {}

  async checkIfUserExistByMobile(mobile) {
    const user = await this.#model.findOne({ mobile });
    if (!user) {
      throw new createHttpError.NotFound(AuthMessages.NotFound);
    }
    return user;
  }
}

export default new AuthService();
