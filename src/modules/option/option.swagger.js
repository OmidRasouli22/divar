/**
 * @swagger
 * tags:
 *  name: Option
 *  description: Option module
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateNewOption:
 *              type: object
 *              required:
 *                  -   title
 *                  -   key
 *                  -   type
 *                  -   category
 *              properties:
 *                  title:
 *                      type: string
 *                  category:
 *                      type: string
 *                  key:
 *                      type: string
 *                  type:
 *                      type: string
 *                      enum: [number, string, array, boolean]
 *                  guide:
 *                      type: string
 *                  required:
 *                      type: boolean
 *                  enum:
 *                      type: array
 *                      items:
 *                          type: string
 */

/**
 * @swagger
 * /api/option/create:
 *  post:
 *      summary: create new option
 *      tags:
 *          -   Option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateNewOption'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateNewOption'
 *      responses:
 *          201:
 *              description: created
 */

/**
 * @swagger
 * /api/option/category/{categoryId}:
 *  get:
 *      summary: get options for one category
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: categoryId
 *              type: string
 *      responses:
 *          200:
 *              description: OK
 */

/**
 * @swagger
 * /api/option/category-slug/{categorySlug}:
 *  get:
 *      summary: get options for one category slug
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: categorySlug
 *              type: string
 *      responses:
 *          200:
 *              description: OK
 */

/**
 * @swagger
 * /api/option/{optionId}:
 *  get:
 *      summary: get information for one option
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: optionId
 *              type: string
 *      responses:
 *          200:
 *              description: OK
 */

/**
 * @swagger
 * /api/option/all:
 *  get:
 *      summary: get all options
 *      tags:
 *          -   Option
 *      responses:
 *          200:
 *              description: OK
 */