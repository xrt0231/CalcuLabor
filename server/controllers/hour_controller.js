require('dotenv').config();
const Hour = require('../models/hour_model');

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

module.exports = {
    getHour,
    getHourChart
};