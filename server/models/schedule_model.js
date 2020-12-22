const {transaction, commit, rollback, query} = require('./mysqlcon');

//Get production gantt chart schedule
const getGanttChart = async(start, end)=> {
console.log(start, end);
    let result = await query(`SELECT * FROM production_plan WHERE start BETWEEN '${start}' AND '${end}'`);
    
    console.log(result);
    return result;
}

//Get production actual gantt chart schedule
const getActualGanttChart = async(start, end)=> {
    console.log(start, end);
        let result = await query(`SELECT * FROM production_plan WHERE start BETWEEN '${start}' AND '${end}'`);
        
        console.log(result);
        return result;
    }

//Get production order detail
const productionOrderInfo = async(productionOrderNum)=> {
    console.log(productionOrderNum);
    let result = await query(`SELECT * FROM production_plan where production_order_num = ${productionOrderNum}`);
    console.log(result);
    return result;
 }

 const createProductionOrder = async(productionOrderNum, partNum, recordProcess, start, end, outputQty)=> {
    console.log(productionOrderNum, partNum, recordProcess, start, end, outputQty);
    let result = await query(`INSERT INTO production_plan (production_order_num, part_num, production_group, record_process, start, end, output) VALUES (${productionOrderNum}, ${partNum}, 1, '${recordProcess}', '${start}', '${end}', ${outputQty})`);
    let result2 = await query(`SELECT * FROM production_plan where production_order_num = ${productionOrderNum}`);
    console.log(result);
    return result2;
 } 

 const updateProductionOrder = async(productionOrderNum, partNum, recordProcess, start, end, outputQty)=> {
    console.log(productionOrderNum, partNum, recordProcess, start, end, outputQty);
    let result = await query(`UPDATE production_plan SET part_num = ${partNum}, production_group = 1, record_process = '${recordProcess}', start = '${start}', end = '${end}', output = ${outputQty} WHERE production_order_num = ${productionOrderNum}`);
    let result2 = await query(`SELECT * FROM production_plan where production_order_num = ${productionOrderNum}`);
    console.log(result);
    console.log(result);
    return result2;
 } 


module.exports = {
    getGanttChart,
    getActualGanttChart,
    productionOrderInfo,
    createProductionOrder,
    updateProductionOrder 
};