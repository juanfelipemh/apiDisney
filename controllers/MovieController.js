const { Movie, Character, Gender } = require("../models");

let movie = {};

movie.ObtainAllMovies = async (req, res) => { 
    const { name, order, gender } = req.query;

    if(name){
        return findOneMovieByName(req, res);
    }

    if(order){
        return orderMoveByAscOrDesc(req, res);
    }

    if(gender){
        return findGenderOfMovieById(req, res);
    }

    else {
        return listOfMovies(req, res);
    }

}

const listOfMovies = async (req, res) => {
    try {
        const list = await Movie.findAll({
            attributes: ['id', 'image', 'title', 'publicationDate', 'rate']
        })
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const findOneMovieByName = async (req, res) => {
    const title = req.query.title;

    try {      
        if(!title){
            return res.status(400).json({msg: 'The parameter "title" is wrong'})
        }

        const movie = await Movie.findAll({
            where: {
                title: req.query.title
            }
        });

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const findGenderOfMovieById = async (req, res) => {
    const idGender = req.query.gender;

    try {
        if (!idGender) {
            return res.status(400).json({ msg: 'The parameter "movie" is required' })
        }

        const movies = await Movie.findAll({
            attributes: ['id', 'title'],
            include: [
                {
                    model: Gender,
                    attributes: ['id', 'name'],
                    where: {
                        id: idGender
                    },
                    through: {
                        attributes: []
                    }
                }
            ]
        })

        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ msg: error.message });        
    }
}

const orderMoveByAscOrDesc = async (req, res) => {
    const order = req.query.order;

    try {
        const orderByAscOrDesc = (order.toUpperCase()) === 'ASC' ? 'ASC' : 'DESC';

        const movies = await Movie.findAll({
            attributes: ['image', 'title', 'publicationDate', 'rate'],
            order: [['title', orderByAscOrDesc]]
        })

        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}  

movie.createMovie = async (req, res) => {
    const { ...body } = req.body;

    try {
        await validateMovieByTitle(body);

        const newMovie = await Movie.create({
            ...body
        });
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const validateMovieByTitle = async (body) => {
    const movieDb = await Movie.findOne({
        where: {
            title: body.title
        }
    });

    if(movieDb){
        throw new Error(`The movie ${movieDb.title} exist in the database`);
    }    
}  

movie.updateMovie = async (req, res) => {
    const { image, title, publicationDate, rate } = req.body;
    const { id } = req.params;

    try {
        const movie = await validateMovieById(id);

        await Movie.update({
            image: image,
            title: title,
            publicationDate: publicationDate,
            rate: rate
        },{
            where: {
                id: movie.id
            }
        });

        res.status(200).json({msg: "Movie updated"});
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

movie.deleteMovie = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = validateMovieById(id);

        await Movie.destroy({
            where: {
                id: movie.id
            }
        });

        res.status(200).json({msg: "Movie was deleted correctly"});
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

movie.findOneMovie = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await validateMovieById(id);

        const movieInfo = await Movie.findOne({
            attributes: ['id', 'title', 'publicationDate'],
            where: {
                id: movie.id
            },
            include: [
                {
                    model: Character,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            ]
        })

        res.status(200).json(movieInfo);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

const validateMovieById = async (id) => {
    const movieDb = await Movie.findOne({
        where: {
            id: id
        }
    });

    if (!movieDb) {
        throw new Error(`The movie with ID ${id} doesn't exist`);
    }

    return movieDb.id;
}

module.exports = movie;