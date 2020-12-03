const {transaction, commit, rollback, query} = require('./mysqlcon');

//Get production order detail from DB
// const getProductionData = async(date)=> {

//     let result = await query(`SELECT * FROM production_plan`);
    
//     return result;
// }

//Get production order detail
const getProductionData = async(productionOrderNum)=> {

    let result = await query(`SELECT * FROM production_records where production_order_num = ${productionOrderNum}`);
    
    return result;
 }

//Get production order detail
const updateProductionData = async()=> {

//     let result = await query(`SELECT * FROM production_records where production_order_num = ${}`);
    
//     return result;
 }
 
module.exports = {
    getProductionData,
    updateProductionData
};