const express = require("express");

const { check } = require("express-validator");
const validateFields = require("../middleware/validateFields.js");
const user = require("../controllers/UserController.js");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas: 
 *     Authorization_User:
 *       type: object
 *       properties: 
 *         name: 
 *           type: string
 *           description: User name
 *         email: 
 *           type: string
 *           description: User email
 *         password: 
 *           type: string  
 *           description: User password
 *         confirmationPassword: 
 *           type: string  
 *           description: Confirm the password
 *       required:
 *         - name
 *         - email
 *         - password
 *       example: 
 *         name: Pablo
 *         email: pablo@prueba.com
 *         password: A21212584a.
 *         confirmationPassword: A21212584a.
 */

/**
 * @swagger
 * /api/auth/register:
 *      post:
 *          summary: Register user
 *          tags: [Authorization user]
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Authorization_User'
 *          responses:
 *              200: 
 *                  description: user created! 
 *              403: 
 *                  description: Error with user creation! 
 */
router.post('/auth/register', [
    check('name', 'Field name is not complete').not().isEmpty(),
    check('email', 'Field email is not complete').isEmail().not().isEmpty(),
    check('password', 'Field password is not complete').not().isEmpty(),
    validateFields
], user.createNewUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authorization user]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           example: 
 *             email: pablo@prueba.com
 *             password: A21212584a.
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '403':
 *         description: Error with user login
 */
router.post('/auth/login', [
    check('email', 'Field email is not complete').isEmail().not().isEmpty(),
    check('password', 'Field password is not complete').not().isEmpty(),
    validateFields
], user.loginUser);


module.exports = router;