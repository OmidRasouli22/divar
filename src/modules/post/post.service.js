import autoBind from "auto-bind";
import Post from "./post.model.js";
import createHttpError from "http-errors";
import { isValidObjectId, Types } from "mongoose";
import slugify from "slugify";

class PostService {
  #model;

  constructor() {
    autoBind(this);
    this.#model = Post;
  }
}

export default new PostService();
