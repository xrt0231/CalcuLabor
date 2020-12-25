const {transaction, commit, rollback, query} = require('./mysqlcon');

const dropdownPartNum = async(recordProcess)=> {
    console.log(recordProcess);
    let result = await query(`SELECT part_num FROM mmem.process_standard_output WHERE record_process = '${recordProcess}'`)
    console.log("2");
    return result;
 }

const getStandard = async(recordProcess, partNum)=> {
    let result = await query(`SELECT standard_output FROM mmem.process_standard_output WHERE record_process = '${recordProcess}' AND part_num = ${partNum}`)
    console.log(result);
    return result;
 }

 const createStandard = async(recordProcess, partNum, outputStandard)=> {
     console.log(recordProcess, partNum, outputStandard);
    let result = await query(`SELECT * FROM mmem.process_standard_output WHERE record_process = '${recordProcess}' AND part_num = ${partNum}`)
    if (result) {
        let warning = {warning: "Data incorrect, please check......"}
        return warning
        }else{
            let result1 = await query(`INSERT INTO mmem.process_standard_output SET part_num = ${partNum}, record_process = '${recordProcess}', standard_output = ${outputStandard}`)
            return result1;
        }
 }

 const updateStandard = async(recordProcess, partNum, outputStandard)=> {
    let result = await query(`UPDATE mmem.process_standard_output SET standard_output = ${outputStandard} WHERE part_num = ${partNum} AND record_process = '${recordProcess}'`)
    let result1 = await query(`SELECT * FROM mmem.process_standard_output WHERE record_process = '${recordProcess}' AND part_num = ${partNum}`)
    return result1;
 }

 module.exports = {
     dropdownPartNum,
     getStandard,
     createStandard,
     updateStandard,
     
 };