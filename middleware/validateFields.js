const express = require("express");
const { validationResult } = require("express-validator");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};

module.exports = validateFields;
