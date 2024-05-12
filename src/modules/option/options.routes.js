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
router.get("/:optionId", optionController.findById);
router.get("/all", optionController.allOptions);
export default router;
