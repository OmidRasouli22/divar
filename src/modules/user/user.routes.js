import { Router } from "express";
import userController from "./user.controller.js";
import { auth } from "../../guards/authorization.guard.js";

const router = Router();

router.get("/me", auth, userController.getMe);

export default router;
