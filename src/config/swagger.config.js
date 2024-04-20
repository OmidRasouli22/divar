import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import process from "process";

export default function swaggerConfig(app) {
  const swaggerDocument = swaggerJSDoc({
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "divar-backend",
        description: "express js web application",
        version: "1.0.0",
      },
    },
    apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
  });

  const swagger = swaggerUi.setup(swaggerDocument, {});
  app.use("/swagger-ui", swaggerUi.serve, swagger);
}
