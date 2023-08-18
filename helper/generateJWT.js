const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


const generateJWT = ( id, name ) =>{
    return jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "2h"});
}

module.exports = generateJWT;