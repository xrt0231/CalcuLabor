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

 //Update working hour
const clockInOut = async(recordProces, start, end, employeeId)=> {
    console.log(recordProces, start, end, employeeId);
    let result = await query(`UPDATE working_hour SET (record _process = ${recordProces}, start = '${start}', end = '${end}') WHERE employee_id = ${employeeId}`);

}

 module.exports = {
     getHour,
     getHourChart,
     clockInOut
 };