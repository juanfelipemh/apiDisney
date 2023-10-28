const { Character, Movie, Gender, Character_movie_gender } = require("../models");
const Sequelize = require('sequelize');

CharacterMovieGender = {};

CharacterMovieGender.createRelationOnTable = async (req, res) => {
    const { idCharacter, idMovie, idGender } = req.body;

    try {

        await validateifIdExist(idCharacter, idMovie, idGender);

        const [ newRecord, created ] = await Character_movie_gender.findOrCreate({
            where: {
                idCharacter: idCharacter,
                idMovie: idMovie,
                idGender: idGender
            }
        });

        if(!created){
            return res.status(400).json({msg: "Record already exists..."});
        }

        res.status(201).json(newRecord)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const validateifIdExist = async (idCharacter, idMovie, idGender) => {

    const characterDb = await Character.findOne({
        where: {
            id: idCharacter
        }
    })

    const movieDb = await Movie.findOne({
        where: {
            id: idMovie
        }
    })

    const genderDB = await Gender.findOne({
        where: {
            id: idGender
        }
    })

    if(!characterDb){
        throw new Error(`The movie with IdCharacter ${idCharacter} doesn't exist`);
    }

    if(!movieDb){
        throw new Error(`The movie with idMovie ${idMovie} doesn't exist`);
    }

    if(!genderDB){
        throw new Error(`The movie with idGender ${idGender} doesn't exist`);
    }
}    


module.exports = CharacterMovieGender;