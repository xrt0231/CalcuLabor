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

const updateProductionData = async (req, res) => {

    let productionOrderNum = req.body.productionOrderNum;
    let outputQty = req.body.outputQty;
    
    //Get star time from UI and convert to DATETIME format 
    let startGet = new Date(`${req.body.start}`);
    let start = moment(startGet).format("YYYY-MM-DD HH:mm:ss");
    
    //Get end time from UI and convert to DATETIME format 
    let endGet = new Date(`${req.body.end}`);
    let end = moment(endGet).format("YYYY-MM-DD HH:mm:ss");
    
    
    const production = (await Production.updateProductionData(productionOrderNum, start, end, outputQty));
    res.send(production);
    
};

module.exports = {
    getProductionData,
    updateProductionData
};