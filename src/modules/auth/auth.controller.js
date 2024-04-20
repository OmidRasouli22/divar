import userService from "../user/user.service.js";
import AuthMessages from "./auth.messages.js";
import authService from "./auth.service.js";
import autoBind from "auto-bind";

class AuthController {
  #service;
  #userService;

  constructor() {
    autoBind(this);
    this.#service = authService;
    this.#userService = userService;
  }

  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      await this.#service.sendOTP(mobile);
      return {
        message: AuthMessages.SendOTPSuccessfully,
      };
    } catch (error) {
      next(error);
    }
  }

  async checkOTP(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
