import AuthMessages from "./auth.messages.js";
import authService from "./auth.service.js";
import autoBind from "auto-bind";

class AuthController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = authService;
  }

  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      await this.#service.sendOTP(mobile);
      return res.json({
        message: AuthMessages.SendOTPSuccessfully,
      });
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
const authController = new AuthController();
export default authController;
