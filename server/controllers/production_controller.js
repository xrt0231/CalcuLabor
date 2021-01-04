require('dotenv').config();
const Production = require('../models/production_model');
var moment = require('moment-timezone');

//Fetch production data
const getProductionData = async (req, res) => {
	let productionOrderNum = req.body.productionOrderNum;
    
	const production = (await Production.getProductionData(productionOrderNum));
	res.send(production);
    
};

const fastCheckInOut = async (req, res) => {

	let productionOrderNum = req.body.productionOrderNum;
	let recordProces = req.body.recordProces;
	let outputQty = req.body.outputQty;
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
    
	const production = (await Production.fastCheckInOut(productionOrderNum, dateTime, outputQty));
	res.send(production);
    
};

const dropdownProdOrdNum = async (req, res) => {
	let process = req.body.process;
	const production = (await Production.dropdownProdOrdNum(process));
	res.send(production);
    
};

module.exports = {
	getProductionData,
	fastCheckInOut,
	dropdownProdOrdNum
};