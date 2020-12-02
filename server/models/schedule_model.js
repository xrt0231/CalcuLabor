const {transaction, commit, rollback, query} = require('./mysqlcon');

//Get production gantt chart schedule
const getGanttChart = async(date)=> {

    let result = await query(`SELECT * FROM production_plan`);
    
    return result;
}

//Get production order detail
const productionOrderInfo = async(productionOrderNum, recordProcess, outputQty)=> {

    let result = await query(`SELECT * FROM production_records where production_order_num = ${productionOrderNum}`);
    
    return result;
 }
module.exports = {
    getGanttChart,
    productionOrderInfo
};