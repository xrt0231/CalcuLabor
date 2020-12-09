const {transaction, commit, rollback, query} = require('./mysqlcon');

//Get working hour data for clock in/out
const getHour = async(employeeId, recordProces, start, end)=> {
    console.log(employeeId, recordProces, start, end);
    // let result = await query(`SELECT * FROM working_hour WHERE employee_id = ${employeeId} AND record_process = '${recordProces}'`);
    let result = await query(`SELECT work_log_id, max(start) AS recentStart, end AS recentEnd FROM working_hour GROUP BY work_log_id ORDER BY start DESC LIMIT 1`);
    console.log(result);
    console.log('==============================');
    return result;
 }

 //Get working hour data for ganttchart
 const getHourChart = async(employeeId, date)=> {
    console.log(employeeId);
    let result = await query(`SELECT * FROM working_hour WHERE employee_id = ${employeeId} AND start >= '${date}'`);
    console.log(result);
    return result;
 }

 //Update working hour
    const clockInOut = async(employeeId, recordProces, dateTime)=> {
   
    let result = await query(`SELECT work_log_id, max(start) AS recentStart, end AS recentEnd FROM working_hour GROUP BY work_log_id ORDER BY start DESC LIMIT 1`);
    console.log('dateTime :', dateTime);
    console.log('Get datetime of now ======================================');
    console.log('result :', result);
    console.log('======================================');
    if(result[0].recentEnd){
        let result1 = await query(`INSERT INTO working_hour (employee_id, record_process, start) VALUES (${employeeId}, '${recordProces}', '${dateTime}')`); 
        console.log(result1.insertId)
        } else { 
            let result2 =await query(`UPDATE working_hour SET end = '${dateTime}'
            WHERE employee_id = ${employeeId} AND record_process = '${recordProces}' ORDER BY start DESC LIMIT 1`);
            };
    }

 module.exports = {
     getHour,
     getHourChart,
     clockInOut
 };