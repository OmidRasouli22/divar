/**
 * @swagger
 * tags:
 *  name: User
 *  description: User module
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          SendOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 */

/**
 * @swagger
 * /api/user/me:
 *  get:
 *      summary: get and return authenticated user information - protected route
 *      tags:
 *          -   User
 *      responses:
 *          200:
 *              description: success
 */
