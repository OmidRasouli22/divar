import autoBind from "auto-bind";
import Option from "../option/option.model.js";
import categoryService from "../category/category.service.js";
import { isTrue, isFalse } from "../../common/utils/functions.js";

import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import slugify from "slugify";

class OptionService {
  #optionModel;
  #categoryService;

  constructor() {
    autoBind(this);
    this.#optionModel = Option;
    this.#categoryService = categoryService;
  }

  async create(createOptionDTO) {
    let {
      title,
      key,
      type,
      guide,
      enum: list,
      category,
      required,
    } = createOptionDTO;
    if (!category || !isValidObjectId(category)) {
      throw new createHttpError.BadRequest("invalid category");
    }

    const findedCategory = await this.#categoryService.checkExistById(category);
    if (!findedCategory) throw new createHttpError.NotFound("invalid category");
    else category = findedCategory._id;

    key = slugify(key, {
      trim: true,
      replacement: "_",
    }).toLowerCase();

    await this.checkExistOption(category, key);

    // check enum list
    if (list && typeof list === "string") {
      list = list.split(",");
    } else if (!Array.isArray(list)) {
      list = [];
    }

    if (isTrue(required)) required = true;
    else if (isFalse(required)) required = false;
    else required = false;

    const newOption = await this.#optionModel.create({
      title,
      key,
      type,
      guide,
      enum: list,
      category,
      required,
    });
    return newOption;
  }

  async optionsForOneCategory(categoryId) {
    if (!categoryId || !isValidObjectId(categoryId)) {
      throw new createHttpError.BadRequest("invalid category");
    }

    const findedCategory = await this.#categoryService.checkExistById(
      categoryId
    );
    if (!findedCategory) throw new createHttpError.NotFound("invalid category");

    const options = await this.#optionModel.find(
      {
        category: categoryId,
      },
      { __v: 0, updatedAt: 0 },
      { populate: { path: "category", select: "-__v -updatedAt" } }
    );

    return options;
  }

  async findById(id) {
    if (!id || !isValidObjectId(id)) {
      throw new createHttpError.BadRequest("invalid option");
    }

    const findedOption = await this.#optionModel
      .findById(id)
      .select("-__v -updatedAt")
      .populate("category", "-__v -updatedAt");
    if (!findedOption) throw new createHttpError.NotFound("invalid option");

    return findedOption;
  }

  async removeById(id) {
    if (!id || !isValidObjectId(id)) {
      throw new createHttpError.BadRequest("invalid option");
    }

    const { acknowledged, deletedCount } = await this.#optionModel.deleteOne({
      _id: id,
    });
    if (acknowledged && deletedCount === 1) return true;
    else throw new createHttpError.InternalServerError("an error occurred");
  }

  async allExistedOptions() {
    const options = await this.#optionModel.find(
      {},
      { __v: 0, updatedAt: 0 },
      { populate: { path: "category", select: "-__v -updatedAt" } }
    );
    return options;
  }

  async allOptionsByCategorySlug(slug) {
    const options = await this.#optionModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $addFields: {
          categorySlug: "$category.slug",
          categoryId: "$category._id",
          categoryName: "$category.name",
        },
      },
      {
        $project: {
          category: 0,
          __v: 0,
          updatedAt: 0,
        },
      },
      {
        $match: {
          categorySlug: slug,
        },
      },
    ]);
    return options;
  }

  async checkExistOption(category, key) {
    const option = await this.#optionModel.findOne({ category, key });
    if (option)
      throw new createHttpError.Conflict(
        "This option is already registered for this category"
      );
    return null;
  }
}

export default new OptionService();
