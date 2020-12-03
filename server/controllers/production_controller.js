require('dotenv').config();
const Production = require('../models/production_model');

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
    // let productionOrderNum = req.body.productionOrderNum;
    // let recordProcess = req.body.recordProcess;
    // let outputQty = req.body.outputQty;
    
    // console.log(productionOrderNum);
    // console.log(productionOrderNum.slice(2,12))
    
    const production = (await Production.updateProductionData());
    res.send(production);
    
};

module.exports = {
    getProductionData,
    updateProductionData
};