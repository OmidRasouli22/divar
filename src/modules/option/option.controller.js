import autoBind from "auto-bind";
import optionService from "./option.service.js";

class OptionController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = optionService;
  }

  async create(req, res, next) {
    try {
      const { title, key, type, guide, enum: list, category } = req.body;
      // TODO: Validation here
      const newOption = await this.#service.create({
        title,
        key,
        type,
        guide,
        enum: list,
        category,
      });
      return res.status(201).json({
        message: "Option created successfully",
        data: {
          option: newOption,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllOptionsForOneCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const optionsForCategories = await this.#service.optionsForOneCategory(
        categoryId
      );
      return res.status(200).json({
        message: "all options related to one category",
        data: {
          options: optionsForCategories,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const { optionId } = req.params;
      const option = await this.#service.findById(optionId);
      return res.status(200).json({
        message: "an option with related id",
        data: {
          option,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async allOptions(req, res, next) {
    try {
      const options = await this.#service.allExistedOptions();
      return res.status(200).json({
        message: "all options",
        data: {
          options,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async findOptionsByCategorySlug(req, res, next) {
    try {
      const options = await this.#service.allOptionsByCategorySlug(
        req.params.categorySlug
      );
      return res.status(200).json({
        message: `all options by category slug: ${req.params.categorySlug}`,
        data: {
          options,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      await this.#service.removeById(req.params.optionId ?? "");
      return res.status(200).json({
        message: `Option deleted successfully`,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new OptionController();
