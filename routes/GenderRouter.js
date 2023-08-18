const express = require("express");

const { check } = require("express-validator");
const validateFields = require("../middleware/validateFields.js");
const gender = require("../controllers/GenderController.js");
const authUser = require("../middleware/authUser.js");

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:  
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   security:  
 *     - bearerAuth: []
 *   schemas: 
 *     Gender:
 *       type: object
 *       properties: 
 *         name: 
 *           type: string
 *           description: name
 *         image: 
 *           type: string
 *           description: image 
 *       required:
 *         - name
 *         - image
 *       example: 
 *         name: horror
 *         image: Horror.png
 */

/**
 * @swagger
 * /api/genders:
 *      post:
 *          summary: Create new gender
 *          tags: [Gender]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Gender'
 *          responses:
 *              200: 
 *                  description: Gender created! 
 *              403: 
 *                  description: Error with gender creation! 
 */
router.post('/genders', [
    authUser,
    check('name', 'Field name is not complete').not().isEmpty(),
    check('image', 'Field image is not complete').not().isEmpty(),
    validateFields
], gender.createGender);

/**
 * @swagger
 * /api/genders:
 *   get:
 *     summary: Obtain all genders
 *     tags: [Gender]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gender'
 */
router.get('/genders', authUser, gender.listOfGender);


module.exports = router;