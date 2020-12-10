require('dotenv').config();
const User = require('../models/user_model');
const jwt = require('jsonwebtoken')

//For production schedule
const signUp = async (req, res) => {
    const hash = crypto.createHash('sha256');
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    hash.update(password);
    let encryptPassWord = hash.copy().digest('hex');
    console.log(encryptPassWord);
};

module.exports = {
    signUp
};