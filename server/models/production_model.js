const {transaction, commit, rollback, query} = require('./mysqlcon');

//Get production order detail
const getProductionData = async(productionOrderNum)=> {

    let result = await query(`SELECT * FROM production_records where production_order_num = ${productionOrderNum}`);
    
    return result;
 }

//Update production data
const updateProductionData = async(productionOrderNum, start, end, outputQty)=> {
    console.log(productionOrderNum, start, end);
    let result = await query(`UPDATE production_records SET start = '${start}', end = '${end}', output = ${outputQty} WHERE production_order_num = ${productionOrderNum}`);
    console.log(result);
    return result;
 }
 
module.exports = {
    getProductionData,
    updateProductionData
};