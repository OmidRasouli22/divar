import autoBind from "auto-bind";
import categoryService from "./category.service.js";
import HttpCodes from "http-codes";

class CategoryController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = categoryService;
  }

  async createCategory(req, res, next) {
    try {
      const { name, icon, parent } = req.body;
      const category = await this.#service.createCategory({
        name,
        icon,
        parent,
      });
      return res.status(HttpCodes.CREATED).json({
        message: "Category created successfully!",
        data: {
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async allCategories(req, res, next) {
    try {
      const categories = await this.#service.findAll();
      return res.status(HttpCodes.OK).json({
        message: "all categories",
        data: {
          categories,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
const categoryController = new CategoryController();
export default categoryController;
