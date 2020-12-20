const {transaction, commit, rollback, query} = require('./mysqlcon');

//Get production gantt chart schedule
const getGanttChart = async(date)=> {
console.log(date);
    let result = await query(`SELECT * FROM production_plan WHERE start >= '${date}'`);
    console.log(result);
    return result;
}

//Get production order detail
const productionOrderInfo = async(productionOrderNum)=> {

    let result = await query(`SELECT * FROM production_plan where production_order_num = ${productionOrderNum}`);
    console.log(result);
    return result;
 }

 const createProductionOrder = async(productionOrderNum, partNum, recordProcess, start, end, outputQty)=> {
    console.log(productionOrderNum, partNum, recordProcess, start, end, outputQty);
    let result = await query(`INSERT INTO production_plan (production_order_num, part_num, production_group, record_process, start, end, output) VALUES (${productionOrderNum}, ${partNum}, 1, '${recordProcess}', '${start}', '${end}', ${outputQty})`);
    console.log(result);
    return result;
 } 

module.exports = {
    getGanttChart,
    productionOrderInfo,
    createProductionOrder
};