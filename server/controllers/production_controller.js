require('dotenv').config();
const Production = require('../models/production_model');
var moment = require('moment-timezone');

//Fetch production one day gantt chart 
// const getProductionData = async (req, res) => {
//     // let date = req.body.date;
//     const production = (await Production.getProductionData());
//     res.send(production);
// };

//
const getProductionData = async (req, res) => {
	let productionOrderNum = req.body.productionOrderNum;
	// let recordProcess = req.body.recordProcess;
	// let outputQty = req.body.outputQty;
    
	// console.log(productionOrderNum);
	// console.log(productionOrderNum.slice(2,12))
    
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
    
	//Get star time from UI and convert to DATETIME format 
	// let startGet = new Date(`${req.body.start}`);
	// let start = moment(startGet).format("YYYY-MM-DD HH:mm:ss");
    
	//Get end time from UI and convert to DATETIME format 
	// let endGet = new Date(`${req.body.end}`);
	// let end = moment(endGet).format("YYYY-MM-DD HH:mm:ss");
    
    
	const production = (await Production.fastCheckInOut(productionOrderNum, dateTime, outputQty));
	console.log(production);
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