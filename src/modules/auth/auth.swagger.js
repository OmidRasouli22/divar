/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: Auth module
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
 * /api/auth/send-otp:
 *  post:
 *      summary: Login with One-Time Password (OTP) with given mobile
 *      tags:
 *          -   Authentication
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/SendOTP'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SendOTP'
 *      responses:
 *          200:
 *              description: success
 */
