import { Router } from "express";
import postController from "./modules/post/post.controller.js";
const router = Router();

router.get("/", (req, res) => {
  res.locals.layout = "./layouts/home/main.ejs";
  res.render("./pages/home/index.ejs");
});

router.get("/panel", (req, res) => {
  res.render("./pages/panel/dashboard.ejs");
});

router.get("/login-register", (req, res) => {
  res.locals.layout = "./layouts/auth/main.ejs";
  res.render("./pages/auth/index.ejs");
});

router.get("/post/create", postController.createPostPage);

export default router;
