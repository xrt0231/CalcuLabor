require('dotenv').config();
const Hour = require('../models/hour_model');

//For production schedule
const getHour = async (req, res) => {
    const hour = (await Hour.getHour());
    res.send('<h1>This is a test<h1>');
};

module.exports = {
    getHour
};