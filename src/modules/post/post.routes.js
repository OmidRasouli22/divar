import { Router } from "express";
import postController from "./post.controller.js";
import upload from "../../common/utils/multer.js";

const router = Router();

router.post("/create", upload.array("images", 10), postController.create);

export default router;
