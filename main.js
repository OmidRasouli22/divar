import express from "express";
import "dotenv/config.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import expressLayouts from "express-ejs-layouts";

// main
import connectDB from "./src/config/db.config.js";
import apiRoutes from "./src/api.routes.js";
import appRoutes from "./src/app.routes.js";
import swaggerConfig from "./src/config/swagger.config.js";
import {
  AllExceptionHandler,
  NotFoundHandler,
} from "./src/common/exceptions/error-handler.exception.js";

async function main() {
  const app = express();

  // config bodyParser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // sanitize mongo data
  app.use(mongoSanitize());

  // use compression
  app.use(compression());

  // config morgan package
  if (process.env.NODE_ENV === "development") {
    console.log("[Server]: Morgan is running ...");
    app.use(morgan("dev"));
  }

  // config cors
  app.use(cors());

  app.use(cookieParser(process.env.COOKIE_PARSER_SECRET_KEY));

  //   connect to database
  await connectDB();

  // config swagger
  swaggerConfig(app);

  app.use(express.static("public"));
  app.use(expressLayouts);
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
  app.set("layout", "./layouts/panel/main.ejs");

  // health check api
  app.get("/api/health-check", (req, res) => {
    return res.json({
      success: true,
      message: "API IS RUNNING SUCCESSFULLY ON PORT 3000",
    });
  });

  // config routes
  app.use(appRoutes);
  app.use("/api", apiRoutes);

  // error handler
  NotFoundHandler(app);
  AllExceptionHandler(app);

  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`[Server]: Server is Running on PORT: ${port}`);
  });

  const unexpectedErrorHandler = (err) => {
    console.log(err);
    process.exit(1);
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);

  // SIGTERM handling
  process.on("SIGTERM", () => {
    if (server) {
      process.exit(1);
    }
  });
}
main();
