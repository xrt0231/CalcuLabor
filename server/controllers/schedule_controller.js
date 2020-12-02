require('dotenv').config();
const Schedule = require('../models/schedule_model');

//For production schedule
const getGanttChart = async (req, res) => {
    let date = req.body.date;
    const schedule = (await Schedule.getGanttChart(date));
    res.send(schedule);
};

const productionOrderInfo = async (req, res) => {
    let productionOrderNum = req.body.productionOrderNum;
    let recordProcess = req.body.recordProcess;
    let outputQty = req.body.outputQty;
    
    // console.log(productionOrderNum);
    // console.log(productionOrderNum.slice(2,12))
    
    const schedule = (await Schedule.productionOrderInfo(productionOrderNum, recordProcess, outputQty));
    res.send(schedule);
    
};

module.exports = {
    getGanttChart,
    productionOrderInfo
};