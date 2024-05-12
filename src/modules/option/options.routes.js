import express from "express";
import optionController from "./option.controller.js";

const router = express.Router({
  caseSensitive: true,
});

router.post("/create", optionController.create);
router.get(
  "/category/:categoryId",
  optionController.getAllOptionsForOneCategory
);
router.get(
  "/category-slug/:categorySlug",
  optionController.findOptionsByCategorySlug
);
router.get("/all", optionController.allOptions);
router.get("/:optionId", optionController.findById);
router.delete("/:optionId", optionController.remove);
export default router;
