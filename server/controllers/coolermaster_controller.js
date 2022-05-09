require('dotenv').config();
const CoolerMaster = require('../models/coolermaster_model');

const productRegister = async (req, res) => {
	let productBarcode = req.body.productBarcode;
    
	const productInformation = (await CoolerMaster.productInformation(productBarcode));
	res.send(productInformation);
};

module.exports = {
    productRegister,
}