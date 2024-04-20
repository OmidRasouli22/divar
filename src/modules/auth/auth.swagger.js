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
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                  code:
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

/**
 * @swagger
 * /api/auth/check-otp:
 *  post:
 *      summary: Check OTP for successfull login
 *      tags:
 *          -   Authentication
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOTP'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOTP'
 *      responses:
 *          200:
 *              description: success
 */
