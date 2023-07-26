require('dotenv').config();
const { sanofiInformation } = require('../models/sanofi_model');

const createQRCode = async (req, res) => {
	let productQRCode = req.body.productQRCode;
    
	const Information = (await sanofiInformation.productQRCode(productQRCode));
	res.send(productQRCode);
};

module.exports = {
    createQRCode,
}