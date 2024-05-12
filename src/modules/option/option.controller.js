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
    } catch (error) {
      next(error);
    }
  }

  async getAllOptionsForOneCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async allOptions(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export default new OptionController();
