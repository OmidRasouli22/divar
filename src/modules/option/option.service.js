import autoBind from "auto-bind";
import Option from "../option/option.model.js";
import createHttpError from "http-errors";

class OptionService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = Option;
  }
}

export default new OptionService();
