require('dotenv').config();
const Schedule = require('../models/schedule_model');
var moment = require('moment-timezone');

//For production schedule
const getGanttChart = async (req, res) => {
	// let date = req.body.date;
	//Get star time from UI and convert to DATETIME format
	let startGet = new Date(`${req.body.start}`);
	
	let start = moment(startGet).format("YYYY-MM-DD");
    
	// Get end time from UI and convert to DATETIME format 
	let endGet = new Date(`${req.body.start}`);
	
	let end = moment(endGet.setDate(endGet.getDate()+1)).format("YYYY-MM-DD");

	const schedule = (await Schedule.getGanttChart(start, end));
	res.send(schedule);
};

//For actual production schedule
const getActualGanttChart = async (req, res) => {
	// let date = req.body.date;
	//Get star time from UI and convert to DATETIME format
	let startGet = new Date(`${req.body.start}`);
	let start = moment(startGet).format("YYYY-MM-DD");
    
	// Get end time from UI and convert to DATETIME format 
	let endGet = new Date(`${req.body.start}`);
	let end = moment(endGet.setDate(endGet.getDate()+1)).format("YYYY-MM-DD");

	const schedule = (await Schedule.getActualGanttChart(start, end));
	res.send(schedule);
};

const productionOrderInfo = async (req, res) => {
	let productionOrderNum = req.body.productionOrderNum;
	// let recordProcess = req.body.recordProcess;
	// let outputQty = req.body.outputQty;
	// console.log(productionOrderNum.slice(2,12))
	console.log("controller:", productionOrderNum);
	const schedule = (await Schedule.productionOrderInfo(productionOrderNum));
	res.send(schedule);
};

const createProductionOrder = async (req, res) => {

	let productionOrderNum = req.body.productionOrderNum;
	let partNum = req.body.partNum;

	// let productionGroup = req.body.productionGroup;
	let recordProcess = req.body.recordProcess;
	let outputQty = req.body.outputQty;

	//Get star time from UI and convert to DATETIME format
	let startGet = new Date(`${req.body.start}`);
	startGet.setHours(startGet.getHours()+8);
	let start = moment(startGet).format("YYYY-MM-DD HH:mm:ss");
    
	//Get end time from UI and convert to DATETIME format 
	let endGet = new Date(`${req.body.end}`);
	endGet.setHours(endGet.getHours()+8);
	let end = moment(endGet).format("YYYY-MM-DD HH:mm:ss");
    

	console.log(productionOrderNum, partNum, recordProcess, start, end, outputQty);

	const schedule = (await Schedule.createProductionOrder(productionOrderNum, partNum, recordProcess, start, end, outputQty));
	res.send(schedule);
}

const updateProductionOrder = async (req, res) => {

	let productionOrderNum = req.body.productionOrderNum;
	let partNum = req.body.partNum;

	// let productionGroup = req.body.productionGroup;
	let recordProcess = req.body.recordProcess;
	let outputQty = req.body.outputQty;

	//Get star time from UI and convert to DATETIME format
	let startGet = new Date(`${req.body.start}`);
	let start = moment(startGet).format("YYYY-MM-DD HH:mm:ss");
    
	//Get end time from UI and convert to DATETIME format 
	let endGet = new Date(`${req.body.end}`);
	let end = moment(endGet).format("YYYY-MM-DD HH:mm:ss");
    

	console.log(productionOrderNum, partNum, recordProcess, start, end, outputQty);

	const schedule = (await Schedule.updateProductionOrder(productionOrderNum, partNum, recordProcess, start, end, outputQty));
	res.send(schedule);
}

//Auto guess dropdown list of process
const dropdownProcess = async (req, res) => {

	const schedule = (await Schedule.dropdownProcess());
	res.send(schedule);
}

//Auto guess dropdown list of production order num
const dropdownProducionOrderNum = async (req, res) => {
	let recordProcess = req.body.process;
	console.log(recordProcess);
	const schedule = (await Schedule.dropdownProducionOrderNum(recordProcess));
	res.send(schedule);
}

//Auto guess dropdown list of part num
const dropdownPartNum = async (req, res) => {
	let productionOrderNum = req.body.productionOrderNum;
	console.log(productionOrderNum);
	const schedule = (await Schedule.dropdownPartNum(productionOrderNum));
	res.send(schedule);
}

module.exports = {
	getGanttChart, 
	getActualGanttChart,
	productionOrderInfo,
	createProductionOrder,
	updateProductionOrder,
	dropdownProcess,
	dropdownProducionOrderNum,
	dropdownPartNum
};