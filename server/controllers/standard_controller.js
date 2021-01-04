require('dotenv').config();
const Standard = require('../models/standard_model');

//dropdownPartNum
const dropdownPartNum = async (req, res) => {
	let recordProcess = req.body.recordProcess;
	const standard = (await Standard.dropdownPartNum(recordProcess));
	res.send(standard);
};

//Get production standards
const getStandard = async (req, res) => {
	let recordProcess = req.body.recordProcess;
	let partNum = req.body.partNum;
	const standard = (await Standard.getStandard(recordProcess, partNum));
	res.send(standard);
};

//Create production standards
const createStandard = async (req, res) => {
	let recordProcess = req.body.recordProcess;
	let partNum = req.body.partNum;
	let outputStandard = req.body.outputStandard;

	const standard = (await Standard.createStandard(recordProcess, partNum, outputStandard));
	res.send(standard);
};

//Update production standard
const updateStandard = async (req, res) => {
	let recordProcess = req.body.recordProcess;
	let partNum = req.body.partNum;
	let outputStandard = req.body.outputStandard;

	const standard = (await Standard.updateStandard(recordProcess, partNum, outputStandard));
	res.send(standard);
};

module.exports = {
	dropdownPartNum,
	getStandard,
	createStandard,
	updateStandard
};