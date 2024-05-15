import autoBind from "auto-bind";
import Post from "./post.model.js";
import Option from "../option/option.model.js";
import createHttpError from "http-errors";
import { isValidObjectId, Types } from "mongoose";
import slugify from "slugify";

class PostService {
  #model;
  #optionModel;

  constructor() {
    autoBind(this);
    this.#model = Post;
    this.#optionModel = Option;
  }

  async getSpecificCategoryOptions(categoryId) {
    const options = await this.#optionModel.find({
      category: categoryId,
    });
    return options;
  }

  async createPost(createPostDto) {
    const newPost = await this.#model.create(createPostDto);
    return newPost;
  }
}

export default new PostService();
