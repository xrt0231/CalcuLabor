require('dotenv').config();
const User = require('../models/user_model');

//For production schedule
const getUser = async (req, res) => {
    const user = (await User.getUser());
    res.send('<h1>This is a test<h1>');
};

module.exports = {
    getUser
};