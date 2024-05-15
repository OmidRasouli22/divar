import autoBind from "auto-bind";
import postService from "./post.service.js";
import HttpCodes from "http-codes";

import Category from "../category/category.model.js";
import createHttpError from "http-errors";
import { Types } from "mongoose";

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
      let category;

      if (slug && slug.trim().length > 0) {
        slug = slug.trim();
        category = await this.#categoryModel.findOne({ slug });
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
        category,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const { title, content, lat, lng, category } = req.body;

      delete req.body["title"];
      delete req.body["content"];
      delete req.body["lat"];
      delete req.body["lng"];
      delete req.body["category"];

      const options = req.body;

      const newPost = await this.#service.createPost({
        title,
        content,
        coordinate: [lat, lng],
        category: new Types.ObjectId(category),
        options,
      });
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
