import { Router } from "express";
import categoryController from "./category.controller.js";

const router = Router();

router.post("/create", categoryController.createCategory);
router.get("/", categoryController.allCategories);
router.delete("/:id", categoryController.remove);

export default router;
