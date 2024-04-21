import AuthMessages from "./auth.messages.js";
import authService from "./auth.service.js";
import autoBind from "auto-bind";

import cookieConfigs from "../../config/cookies.configs.js";
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
      const { code, mobile } = req.body;
      const accessToken = await this.#service.checkOTP(mobile, code);

      return res
        .cookie("access_token", accessToken, {
          ...cookieConfigs,
        })
        .status(200)
        .json({
          message: AuthMessages.LoginSuccessfully,
        });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      await res.clearCookie("access_token");
      return res.status(200).json({
        message: "User logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
const authController = new AuthController();
export default authController;
