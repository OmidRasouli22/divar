import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export default function swaggerConfig(app) {
  const swaggerDocument = swaggerJSDoc({
    swaggerDefinition: {
      info: {
        title: "divar-backend",
        description: "express js web application",
        version: "1.0.0",
      },
    },
    apis: [],
  });

  const swagger = swaggerUi.setup(swaggerDocument, {});
  app.use("/", swaggerUi.serve, swagger);
}
