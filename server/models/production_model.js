const {transaction, commit, rollback, query} = require('./mysqlcon');

//Get production order detail
const getProductionData = async(productionOrderNum)=> {

    let result = await query(`SELECT * FROM production_plan where production_order_num = ${productionOrderNum}`);
    
    return result;
 }

//Update production data
// const updateProductionData = async(productionOrderNum, start, end, outputQty)=> {
//     console.log(productionOrderNum, start, end);
//     let result = await query(`UPDATE production_records SET start = '${start}', end = '${end}', output = ${outputQty} WHERE production_order_num = ${productionOrderNum}`);
//     console.log(result);
//     return result;   
//  }

const fastCheckInOut = async(productionOrderNum, dateTime, outputQty)=> {
   
    console.log(productionOrderNum, dateTime, outputQty);
    let result = await query(`SELECT * FROM mmem.production_plan WHERE production_order_num = ${productionOrderNum}`);
    console.log(result)
    if(result[0].actual_start){
        console.log(result[0].actual_end)
        let result1 = await query(`UPDATE mmem.production_plan SET actual_end = '${dateTime}', actual_output = ${outputQty} WHERE id = ${result[0].id}`); 
        let result3 = await query(`SELECT * FROM mmem.production_plan WHERE production_order_num = ${productionOrderNum}`);
        console.log(result3)
        return result3;
        
        
        } else { 
            let result2 = await query(`UPDATE mmem.production_plan SET actual_start = '${dateTime}' WHERE id = ${result[0].id}`);
            let result4 = await query(`SELECT * FROM mmem.production_plan WHERE production_order_num = ${productionOrderNum}`);
            return result4;
        }
    }

    //Get dropdown production order num
    const dropdownProdOrdNum = async(process)=> {

        let result = await query(`SELECT production_order_num FROM mmem.production_plan WHERE record_process = '${process}' AND actual_end IS NULL`);
        
        return result;
    }

module.exports = {
    getProductionData,
    fastCheckInOut,
    dropdownProdOrdNum
};