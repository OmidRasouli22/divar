import { Router } from "express";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import categoryRoutes from "./modules/category/category.routes.js";
import optionRoutes from "./modules/option/options.routes.js";
import postRoutes from "./modules/post/post.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/option", optionRoutes);
router.use("/post", postRoutes);

export default router;
