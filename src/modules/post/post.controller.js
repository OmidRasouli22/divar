import autoBind from "auto-bind";
import postService from "./post.service.js";

import Category from "../category/category.model.js";
import createHttpError from "http-errors";
import { Types } from "mongoose";
import utf8 from "utf8";
import axios from "axios";

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
      const images = req.files?.map((image) => image?.path?.slice(7));
      const { title, content, lat, lng, category } = req.body;
      // get address
      const result = await axios.get(
        `https://map.ir/reverse/no?lat=${lat}&lon=${lng}`,
        {
          headers: {
            "x-api-key": process.env.MAP_API_KEY,
          },
        }
      );

      delete req.body["title"];
      delete req.body["content"];
      delete req.body["lat"];
      delete req.body["lng"];
      delete req.body["category"];
      delete req.body["images"];

      let options = req.body;
      for (let key in options) {
        let value = options[key];
        delete options[key];
        key = utf8.decode(key);
        options[key] = value;
      }

      const newPost = await this.#service.createPost({
        title,
        content,
        images,
        coordinate: [lat, lng],
        category: new Types.ObjectId(category),
        province: result?.data?.province,
        city: result?.data?.city,
        address: result?.data?.address_compact,
        district: result?.data?.region,
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
