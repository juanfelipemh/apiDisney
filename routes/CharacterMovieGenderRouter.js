const express = require("express");
const characterMovieGender = require("../controllers/CharacterMovieGenderController.js");

const { check } = require("express-validator");
const validateFields = require("../middleware/validateFields.js");
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
 *     Character_movie_gender:
 *       type: object
 *       properties: 
 *         idCharacter: 
 *           type: integer
 *           description: Id of character
 *         idMovie: 
 *           type: integer
 *           description: Id of movie
 *         idGender: 
 *           type: integer
 *           description: Id of gender
 *       required:
 *         - idCharacter
 *         - idMovie
 *         - idGender
 *       example: 
 *         idCharacter: 2
 *         idMovie: 1
 *         idGender: 1
 */

/**
 * @swagger
 * /api/relationTables:
 *      post:
 *          summary: Create relationship between tables Character, Movie and Gender
 *          tags: [Character_movie_gender]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Character_movie_gender'
 *          responses:
 *              200: 
 *                  description: Association created! 
 */
router.post('/relationTables', [
    authUser,
    check('idCharacter', 'Field idCharacter is not complete').isNumeric().notEmpty(),
    check('idMovie', 'Field idMovie is not complete').isNumeric().notEmpty(),
    check('idGender', 'Field idGender is not complete').isNumeric().notEmpty(),
    validateFields
], characterMovieGender.createRelationOnTable);

module.exports = router;