const {transaction, commit, rollback, query} = require('./mysqlcon');

//Get working hour data for clock in/out
const getHour = async(employeeId, recordProcess)=> {
	console.log(employeeId, recordProcess);
	// let result = await query(`SELECT * FROM working_hour WHERE employee_id = ${employeeId} AND record_process = '${recordProces}'`);
	let result = await query(`SELECT work_log_id, employee_id, max(start) AS recentStart, end AS recentEnd FROM working_hour WHERE employee_id = ${employeeId} AND record_process = '${recordProcess}' GROUP BY work_log_id, employee_id ORDER BY start DESC LIMIT 1`);
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

	let result1 = await query(`SELECT * FROM working_hour WHERE employee_id = ${employeeId}`)
	if (result1.length > 0){
		let result2 = await query(`SELECT work_log_id, employee_id, record_process, max(start) AS recentStart, end AS recentEnd FROM working_hour WHERE employee_id = ${employeeId} AND record_process = '${recordProces}' GROUP BY work_log_id ORDER BY start DESC LIMIT 1`);
            
		if(result2.recentEnd){
			let result3 = await query(`INSERT INTO working_hour (employee_id, record_process, start) VALUES (${employeeId}, '${recordProces}', '${dateTime}')`); 
			let result4 = await query(`SELECT work_log_id, employee_id, record_process, start AS recentStart, end AS recentEnd FROM mmem.working_hour WHERE employee_id = ${employeeId} AND record_process = '${recordProces}' GROUP BY work_log_id, employee_id ORDER BY start DESC LIMIT 1`);
			return result5;
		}else{
			let result6 =await query(`UPDATE working_hour SET end = '${dateTime}' WHERE employee_id = ${employeeId} AND record_process = '${recordProces}' ORDER BY start DESC LIMIT 1`);
			let result7 = await query(`SELECT work_log_id, employee_id, record_process, start AS recentStart, end AS recentEnd FROM mmem.working_hour WHERE employee_id = ${employeeId} AND record_process = '${recordProces}' GROUP BY work_log_id, employee_id ORDER BY start DESC LIMIT 1`);
			return result7;
		}
            
	}else{
		let result8 = await query(`INSERT INTO working_hour (employee_id, record_process, start) VALUES (${employeeId}, '${recordProces}', '${dateTime}')`); 
		let result9 = await query(`SELECT work_log_id, employee_id, record_process, start AS recentStart, end AS recentEnd FROM mmem.working_hour WHERE employee_id = ${employeeId} AND record_process = '${recordProces}' GROUP BY work_log_id, employee_id ORDER BY start DESC LIMIT 1`);
		return result9;
	}
}

module.exports = {
	getHour,
	getHourChart,
	clockInOut
};