const {transaction, commit, rollback, query} = require('./mysqlcon');

//Get working hour data for clock in/out
const getHour = async(employeeId, recordProces)=> {
    console.log(employeeId, recordProces);
    let result = await query(`SELECT * FROM working_hour WHERE employee_id = ${employeeId} AND record_process = '${recordProces}'`);
    console.log(result);
    return result;
 }

 //Get working hour data for ganttchart
 const getHourChart = async(employeeId)=> {
    console.log(employeeId);
    let result = await query(`SELECT * FROM working_hour WHERE employee_id = ${employeeId}`);
    console.log(result);
    return result;
 }
 module.exports = {
     getHour,
     getHourChart
 };