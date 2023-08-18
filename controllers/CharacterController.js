const { Movie, Character, Gender } = require("../models");

let character = {};

character.obtainAllCharacters = async (req, res) => {
    const { name, age, movie } = req.query;

    if (name) {
        return findOneCharacterByName(req, res);
    }

    if (age) {
        return findOneCharacterByAge(req, res);
    }

    if (movie) {
        return findMoviesOfCharacter(req, res);
    }

    else {
        return listOfCharacters(req, res);
    }
}

const listOfCharacters = async (req, res) => {
    try {
        const list = await Character.findAll({
            attributes: ['id', 'image', 'name']
        });

        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const findOneCharacterByName = async (req, res) => {
    const name = req.query.name;

    try {
        if (!name) {
            return res.status(400).json({ msg: 'The parameter "name" is wrong' })
        }

        const characters = await Character.findAll({
            where: {
                name: req.query.name
            }
        });

        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const findOneCharacterByAge = async (req, res) => {
    const age = req.query.age;

    try {
        if (!age) {
            return res.status(400).json({ msg: 'The parameter "age" is wrong' })
        }

        const characters = await Character.findAll({
            where: {
                age: req.query.age
            }
        });

        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const findMoviesOfCharacter = async (req, res) => {
    const movieId = req.query.movie;

    try {
        if (!movieId) {
            return res.status(400).json({ msg: 'The parameter "movie" is required' })
        }

        const characters = await Character.findAll({
            attributes: ['id', 'name'],
            include: [
              {
                model: Movie,
                attributes: ['id', 'title'],
                where: {
                  id: movieId
                },
                through: {
                    attributes: []
                }
              },
              {
                model: Gender,
                attributes: ['id', 'name'],              
              }
            ]
          });
        
        res.status(200).json(characters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los personajes.' });
    }
}

character.createCharacter = async (req, res) => {
    const { ...body } = req.body;

    try {
        await validateCharacterByName(body);

        const newCharacter = await Character.create({
            ...body
        })
        res.status(201).json(newCharacter);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

character.updateCharacter = async (req, res) => {
    const { image, name, age, weight, history } = req.body;
    const { id } = req.params;

    try {
        const character = await validateCharacterById(id);

        await Character.update({
            image: image,
            name: name,
            age: age,
            weight: weight,
            history: history
        }, {
            where: {
                id: character.id
            }
        })

        res.status(200).json({ msg: 'Character updated correctly' });
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

character.deleteCharacter = async (req, res) => {
    const { id } = req.params;

    try {
        const character = await validateCharacterById(id);

        await Character.destroy({
            where: {
                id: character.id
            }
        });

        res.status(200).json({ msg: "Character was deleted correctly" });
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

const validateCharacterByName = async (body) => {
    const characterDb = await Character.findOne({
        where: {
            name: body.name
        }
    });

    if (characterDb) {
        throw new Error(`The character ${characterDb.name} exist in the database`);
    }
}

character.findOneCharacter = async (req, res) => {
    const { id } = req.params;

    try {
        const character = await validateCharacterById(id);

        const characterInfo = await Character.findOne({
            attributes: ['id', 'name', 'age', 'weight', 'history'],
            where: {
                id: character.id
            }, 
            include: [
                {
                    model: Movie,
                    attributes: ['title', 'publicationDate'],
                    through: {
                        attributes: []
                    }         
                },
            ]
        });

        res.status(200).json(characterInfo);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

const validateCharacterById = async (id) => {
    const characterDb = await Character.findOne({
        where: {
            id: id
        }
    });

    if (!characterDb) {
        throw new Error(`The character with ID ${id} doesn't exist`);
    }

    return characterDb;
}

module.exports = character;