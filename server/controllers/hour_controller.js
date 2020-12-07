require('dotenv').config();
const Hour = require('../models/hour_model');
var moment = require('moment-timezone');

//Getting working hour data for clock in/out
const getHour = async (req, res) => {
    let employeeId = req.body.employeeId;
    let recordProcess =req.body.recordProcess;
    const hour = (await Hour.getHour(employeeId, recordProcess));
    res.send(hour);
};

//Getting working hour data for ganttchart
const getHourChart = async (req, res) => {
    let employeeId = req.body.employeeId;
    console.log(employeeId);
    // let recordProcess =req.body.recordProcess;
    const hour = (await Hour.getHourChart(employeeId));
    res.send(hour);
};

const clockInOut = async (req, res) => {
    let employeeId = req.body.employeeId;
    let recordProcess = req.body.recordProcess;
    //Get star time from UI and convert to DATETIME format 
    let startGet = new Date(`${req.body.start}`);
    let start = moment(startGet).format("YYYY-MM-DD HH:mm:ss");
    
    //Get end time from UI and convert to DATETIME format 
    let endGet = new Date(`${req.body.end}`);
    let end = moment(endGet).format("YYYY-MM-DD HH:mm:ss");

    const hour = (await Hour.clockInOut(recordProcess, start, end, employeeId));
    res.send(hour);
}

module.exports = {
    getHour,
    getHourChart,
    clockInOut
};