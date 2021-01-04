require('dotenv').config();
const Dashboard = require('../models/dashboard_model');

const dashboard1 = async (req, res)=> {

	let startDate = req.body.startDate;
	let endDate = req.body.endDate;
	let recordProcess = req.body.recordProcess;
    
	const dashboard1 = (await Dashboard.dashboard1(recordProcess, startDate, endDate));
	res.send(dashboard1); 
}

const dashboard2 = async (req, res)=> {

	let startDate = req.body.startDate;
	const dashboard2 = (await Dashboard.dashboard2(startDate));
	res.send(dashboard2); 
}

module.exports = {
	dashboard1,
	dashboard2
};

