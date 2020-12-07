require('dotenv').config();
const Standard = require('../models/standard_model');

//For setting production standards
const getStandard = async (req, res) => {
    const hour = (await Standard.getStandard());
    res.send('<h1>This is a test<h1>');
};

module.exports = {
    getStandard
};