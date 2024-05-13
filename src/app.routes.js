import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.locals.layout = "./layouts/home/main.ejs";
  res.render("./pages/home/index.ejs");
});

router.get("/panel", (req, res) => {
  res.render("./pages/panel/dashboard.ejs");
});

export default router;
