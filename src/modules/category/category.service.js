import autoBind from "auto-bind";
import Category from "./category.model.js";
import createHttpError from "http-errors";
import { isValidObjectId, Types } from "mongoose";
import slugify from "slugify";

class CategoryService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = Category;
  }

  async createCategory(CreateCategotyDTO) {
    const { name, icon, parent } = CreateCategotyDTO;
    let parents = [];

    // check that category name is unique
    const findedCategory = await this.#model.findOne({ name });
    if (findedCategory)
      throw new createHttpError.Conflict("this name is already taken");

    // check that parent category id whether valid or not
    if (parent && isValidObjectId(parent)) {
      const category = await this.#model.findById(parent);
      if (!category)
        throw new createHttpError.NotFound("parent id is not valid");
      parents = [
        ...new Set(
          [category._id.toString()].concat(
            category.parents.map((id) => id.toString())
          )
        ).map((id) => new Types.ObjectId(id)),
      ];
    }

    const category = await this.#model.create({
      name,
      slug: slugify(name, {
        lower: true,
        trim: true,
      }),
      parent: parent ? parent : null,
      icon,
      parents,
    });

    return category;
  }

  async findAll() {
    return await this.#model.find({ parent: { $exists: false } });
  }

  async remove(id) {
    await this.checkExistById(id);
    // await this.#optionModel.deleteMany({ category: id }).then(async () => {
    //   await this.#model.deleteMany({ _id: id });
    // });
    await this.#model.deleteOne({ _id: id });
    return true;
  }

  async checkExistById(id) {
    const category = await this.#model.findById(id);
    if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
    return category;
  }
  async checkExistBySlug(slug) {
    const category = await this.#model.findOne({ slug });
    if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
    return category;
  }
}

export default new CategoryService();
