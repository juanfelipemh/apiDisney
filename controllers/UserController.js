const { User } = require("../models");
const argon2 = require("argon2");
const sendEmailRegister = require("../helper/SendEmailRegister.js");
const gerenateJWT = require("../helper/generateJWT.js");

user = {};

user.createNewUser = async (req, res) => { 
    const { name, email, password, confirmationPassword } = req.body;

    try {
        const getHashPassword = await validateNewUser(email, password, confirmationPassword);

        await User.create({
            name: name,
            email: email,
            password: getHashPassword
        });

        sendEmailRegister({
            email, 
            name
        });

        res.status(200).json({msg: "User registered. We sent to your an email wiht account confirmation"});
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}

const validateNewUser = async (email,  password, confirmationPassword) => {
    const findUser = await User.findOne({
        where: {
            email: email
        }
    });

    if(findUser){
        throw new Error("Your email is register in out system");
    }

    if(password !== confirmationPassword){
        throw new Error("Passwords do not match. Complete confirmation password");
    }

    const encrypPassword = await argon2.hash(password);

    return encrypPassword;
}

user.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await validateLoginUser(email, password);

        res.json({
            msg: "User authenticated",
            token: gerenateJWT(user.id, user.name)
        });
        
    } catch (error) {
        res.json({msg: error.message})
    }
}

const validateLoginUser = async ( email, password ) => {
    const user = await User.findOne({
        where: {
            email: email
        }
    });

    if(!user){
        throw new Error("This email is not register");
    }

    const verifyPassword = await argon2.verify(user.password, password);

    if(!verifyPassword){
        throw new Error("Password incorrect");
    }

    return user;
}


module.exports = user;