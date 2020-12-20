require('dotenv').config();
const Schedule = require('../models/schedule_model');
var moment = require('moment-timezone');

//For production schedule
const getGanttChart = async (req, res) => {
    let date = req.body.date;
    const schedule = (await Schedule.getGanttChart(date));
    res.send(schedule);
};

const productionOrderInfo = async (req, res) => {
    let productionOrderNum = req.body.productionOrderNum;
    // let recordProcess = req.body.recordProcess;
    // let outputQty = req.body.outputQty;
    // console.log(productionOrderNum.slice(2,12))
    
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
    let start = moment(startGet).format("YYYY-MM-DD HH:mm:ss");
    
    //Get end time from UI and convert to DATETIME format 
    let endGet = new Date(`${req.body.end}`);
    let end = moment(endGet).format("YYYY-MM-DD HH:mm:ss");
    

    console.log(productionOrderNum, partNum, recordProcess, start, end, outputQty);

    const schedule = (await Schedule.createProductionOrder(productionOrderNum, partNum, recordProcess, start, end, outputQty));
    res.send(schedule);
}

module.exports = {
    getGanttChart,
    productionOrderInfo,
    createProductionOrder
};