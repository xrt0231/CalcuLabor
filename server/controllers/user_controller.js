require('dotenv').config();
const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Crypto hash
const Swal = require('sweetalert2'); //Sweet Alert2

//User Sign Up
const signUp = async (req, res) => {
    
    const hash = crypto.createHash('sha256');
    let username = req.body.username;
    let password = req.body.password;
    hash.update(password);
    let encryptPassWord = hash.copy().digest('hex');
    hash.update(username);
    let token = hash.copy().digest('hex');
    console.log(username, encryptPassWord, token);
    const user = (await User.signUp(username, encryptPassWord, token));
    res.send(user);

};

//User Sign In
const signIn = async (req, res) => {
    const hash = crypto.createHash('sha256');
    let username = req.body.username;
    let password = req.body.password;
    hash.update(password);
    let encryptPassWord = hash.copy().digest('hex');
    console.log(encryptPassWord);
    const user = (await User.signIn(username, encryptPassWord));
    res.send(user);
};

module.exports = {
    signUp, signIn
};