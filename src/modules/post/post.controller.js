import autoBind from "auto-bind";
import postService from "./post.service.js";
import HttpCodes from "http-codes";

import Category from "../category/category.model.js";
import createHttpError from "http-errors";

class PostController {
  #service;
  #categoryModel;

  constructor() {
    autoBind(this);
    this.#service = postService;
    this.#categoryModel = Category;
  }

  async createPostPage(req, res, next) {
    try {
      let { slug } = req.query;
      let showBackBtn = false;
      let categories = [];
      let match = { parent: null };
      let options = [];

      if (slug && slug.trim().length > 0) {
        slug = slug.trim();
        const category = await this.#categoryModel.findOne({ slug });
        if (!category) throw new createHttpError.NotFound("invalid slug");
        match = {
          parent: category._id,
        };
        showBackBtn = true;
        options = await this.#service.getSpecificCategoryOptions(category._id);
      }

      categories = await this.#categoryModel.aggregate([
        {
          $match: match,
        },
      ]);
      res.render("./pages/panel/create-post.ejs", {
        categories,
        showBackBtn,
        options: options.length === 0 ? null : options,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const {} = req.body;
      const newPost = await this.#service.createPost({});
      return res.status(200).json({
        message: "new post created successfully",
        data: {
          post: newPost,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
export default new PostController();
