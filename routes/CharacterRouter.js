const express = require("express");
const character = require("../controllers/CharacterController.js");

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
 *     Character:
 *       type: object
 *       properties: 
 *         image: 
 *           type: string
 *           description: image
 *         name: 
 *           type: string
 *           description: name
 *         age: 
 *           type: integer
 *           description: age
 *         weight: 
 *           type: integer
 *           description: weight
 *         history: 
 *           type: string
 *           description: history
 *       required:
 *         - image
 *         - name
 *         - age
 *         - weight
 *         - history
 *       example: 
 *         image: spider.png
 *         name: Spider man
 *         age: 35
 *         weight: 67
 *         history: El hombre araña es una personaje ficticiosa de marvel que fue mordido por una araña, y por eso, adquirido super poderes
 */

/**
 * @swagger
 * /api/characters:
 *      post:
 *          summary: Create new character
 *          tags: [Character]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Character'
 *          responses:
 *              200: 
 *                  description: Character created! 
 */
router.post('/characters', [
    authUser,
    check('image', 'Field image is not complete').not().isEmpty(),
    check('name', 'Field name is not complete').not().isEmpty(),
    check('age', 'Field age is not complete').not().isEmpty(),
    check('weight', 'Field weight is not complete').not().isEmpty(),
    check('history', 'Field history is not complete').not().isEmpty(),
    validateFields
], character.createCharacter);


/**
 * @swagger
 * /api/characters:
 *   get:
 *     summary: Obtain all characters, Search character by name, Search character by Id
 *     tags: [Character]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by character name
 *       - in: query
 *         name: age
 *         schema:
 *           type: integer
 *         description: Filter by character age
 *       - in: query
 *         name: movie
 *         schema:
 *           type: integer
 *         description: Filter by movie
 *     responses:
 *       200:
 *         description: List of character
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Character'
 */
router.get('/characters', authUser, character.obtainAllCharacters);


/**
 * @swagger
 * /api/characters/{id}:
 *   put:
 *     summary: Update character
 *     tags: [Character]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id character
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Character'
 *     responses:
 *       200:
 *         description: Character was updated correctly
 */
router.put('/characters/:id', [
    authUser,
    check('image', 'Field image is not complete').not().isEmpty(),
    check('name', 'Field name is not complete').not().isEmpty(),
    check('age', 'Field age is not complete').not().isEmpty(),
    check('weight', 'Field weight is not complete').not().isEmpty(),
    check('history', 'Field history is not complete').not().isEmpty(),
    validateFields
], character.updateCharacter);

/**
 * @swagger
 * /api/characters/{id}:
 *   get:
 *     summary: Obtain all characters, Search character by name, Search character by Id
 *     tags: [Character]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Character Id
 *     responses:
 *       200:
 *         description: List of character
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Character'
 */
router.get('/characters/:id', authUser, character.findOneCharacter);

/**
 * @swagger
 * /api/characters/{id}:
 *   delete:
 *     summary: Delete character
 *     tags: [Character]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id character
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Character'
 *     responses:
 *       200:
 *         description: Character delete correctly
 *       404:
 *         description: Character not found
 */
router.delete('/characters/:id', authUser, character.deleteCharacter);

module.exports = router;
