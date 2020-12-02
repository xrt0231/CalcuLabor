const {transaction, commit, rollback, query} = require('./mysqlcon');

//Get production gantt chart schedule
const getGanttChart = async(date)=> {

    let result = await query(`SELECT * FROM production_plan where (start BETWEEN '2020-11-02 00:00:00' AND '2020-11-02 23:00:00')`);
    console.log(result);
    return result;
}

const productionOrderInfo = async(productionOrderNum, recordProcess, outputQty)=> {

    let result = await query(`SELECT * FROM production_records where production_order_num = ${productionOrderNum}`);
    
    console.log(result);
    console.log('test finished');
    return result;
 }
module.exports = {
    getGanttChart,
    productionOrderInfo
};