const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const generateJWT = require("../helper/generateJWT.js")

dotenv.config();

const authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Token is wrong' });
    }

    const token = authHeader.split(' ')[1];
    let jwtPayload;

    try {
        jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.jwtPayload = jwtPayload;        
    } catch (error) {
        return res.status(401).json({ msg: 'User is not authorized' });
    }

    const { id, name } = jwtPayload;

    const newToken = generateJWT(id, name);
    res.setHeader('token', newToken);

    next();
}

module.exports = authUser;