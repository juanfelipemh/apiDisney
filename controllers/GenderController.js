const { Gender } = require("../models");

let gender = {};

gender.createGender = async (req, res) => {
    const { ...body } = req.body;

    try {
        const newGender = await Gender.create({
            ...body
        });
        res.status(201).json(newGender);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

gender.listOfGender = async (req, res) => {
    try {
        const list = await Gender.findAll({
            attributes: ['id', 'name', 'image']
        })
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

module.exports = gender;