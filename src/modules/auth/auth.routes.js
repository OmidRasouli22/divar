import { Router } from "express";
import authController from "./auth.controller.js";
import { auth } from "../../guards/authorization.guard.js";

const router = Router();

router.post("/send-otp", authController.sendOTP);
router.post("/check-otp", authController.checkOTP);
router.post("/logout", auth, authController.logout);

export default router;
