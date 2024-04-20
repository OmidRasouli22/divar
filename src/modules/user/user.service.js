import autoBind from "auto-bind";

import User from "./user.model.js";

class UserService {
  constructor() {
    autoBind(this);
  }
}

export default new UserService();
