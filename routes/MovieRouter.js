const express = require("express");

const { check } = require("express-validator");
const validateFields = require("../middleware/validateFields.js");
const movie = require("../controllers/MovieController.js");
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
 *     Movie:
 *       type: object
 *       properties: 
 *         image: 
 *           type: string
 *           description: Image URL
 *         title: 
 *           type: string
 *           description: Movie title
 *         publicationDate: 
 *           type: string  
 *           format: date-time 
 *           description: Creation date
 *         rate: 
 *           type: integer
 *           description: Movie rating
 *       required:
 *         - image
 *         - title
 *         - publicationDate
 *         - rate
 *       example: 
 *         image: spider.png
 *         title: Spider man - no way home
 *         publicationDate: "2023-08-17T20:50:12Z"
 *         rate: 3
 */

/**
 * @swagger
 * /api/movies:
 *      post:
 *          summary: Create new movie
 *          tags: [Movie]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Movie'
 *          responses:
 *              200: 
 *                  description: movie created! 
 *              403: 
 *                  description: Error with movie creation! 
 */
router.post('/movies', [
    authUser,
    check('image', 'Field image is not complete').not().isEmpty(),
    check('title', 'Field title is not complete').not().isEmpty(),
    check('publicationDate', 'Field publicationDate is not complete').not().isEmpty(),
    check('rate', 'Field rate is not complete').not().isEmpty(),
    validateFields
], movie.createMovie);


/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get a list of movies with optional filters and ordering
 *     tags: [Movie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by movie name
 *       - in: query
 *         name: gender
 *         schema:
 *           type: integer
 *         description: Filter by gender Id
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Order by ASC or DESC
 *     responses:
 *       '200':
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */

router.get('/movies', authUser, movie.ObtainAllMovies);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update movie
 *     tags: [Movie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Movie was updated correctly
 *       404: 
 *         description: Movie with specified ID not found
 */
router.put('/movies/:id', [
    authUser,
    check('image', 'Field image is not complete').not().isEmpty(),
    check('title', 'Field title is not complete').not().isEmpty(),
    check('publicationDate', 'Field publicationDate is not complete').not().isEmpty(),
    check('rate', 'Field rate is not complete').not().isEmpty(),
    validateFields
], movie.updateMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Obtain all movies, Search movie by title, Order movie by ASC or DESC
 *     tags: [Movie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Movie id
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.get('/movies/:id', authUser, movie.findOneMovie);



/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     tags: [Movie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Character delete correctly
 *       404:
 *         description: Character not found
 */
router.delete('/movies/:id', authUser, movie.deleteMovie);


module.exports = router;
