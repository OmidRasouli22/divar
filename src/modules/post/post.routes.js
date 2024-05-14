import { Router } from "express";
import postController from "./post.controller.js";

const router = Router();

router.post("/create", postController.create);

export default router;
