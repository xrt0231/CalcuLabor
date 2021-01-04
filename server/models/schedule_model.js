const {transaction, commit, rollback, query} = require('./mysqlcon');

//Get production gantt chart schedule
const getGanttChart = async(start, end)=> {
	let result = await query(`SELECT * FROM production_plan WHERE start BETWEEN '${start}' AND '${end}'`);
	return result;
}

//Get production actual gantt chart schedule
const getActualGanttChart = async(start, end)=> {
	console.log(start, end);
	let result = await query(`SELECT * FROM production_plan WHERE start BETWEEN '${start}' AND '${end}'`);
	return result;
}

//Get production order detail
const productionOrderInfo = async(productionOrderNum)=> {
	if(productionOrderNum){
		let result = await query(`SELECT * FROM production_plan where production_order_num = ${productionOrderNum}`);
		return result;
	}else result = {};
    
}

const createProductionOrder = async(productionOrderNum, partNum, recordProcess, start, end, outputQty)=> {
	console.log(productionOrderNum, partNum, recordProcess, start, end, outputQty);
	let result = await query(`INSERT INTO production_plan (production_order_num, part_num, production_group, record_process, start, end, output) VALUES (${productionOrderNum}, ${partNum}, 1, '${recordProcess}', '${start}', '${end}', ${outputQty})`);
	let result2 = await query(`SELECT * FROM production_plan where production_order_num = ${productionOrderNum}`);
	return result2;
} 

const updateProductionOrder = async(productionOrderNum, partNum, recordProcess, start, end, outputQty)=> {
	console.log(productionOrderNum, partNum, recordProcess, start, end, outputQty);
	let result = await query(`UPDATE production_plan SET part_num = ${partNum}, production_group = 1, record_process = '${recordProcess}', start = '${start}', end = '${end}', output = ${outputQty} WHERE production_order_num = ${productionOrderNum}`);
	let result2 = await query(`SELECT * FROM production_plan where production_order_num = ${productionOrderNum}`);
	return result2;
} 

const dropdownProcess = async()=> {
	let result = await query(`SELECT record_process FROM mmem.process_standard_output group by record_process;`);
	return result;
} 

const dropdownProducionOrderNum = async(recordProcess)=> {
	console.log(recordProcess)
	let result = await query(`SELECT production_order_num FROM mmem.production_plan WHERE record_process = '${recordProcess}'`);
	return result;
}

const dropdownPartNum = async(productionOrderNum)=> {
	console.log(productionOrderNum)
	let result = await query(`SELECT part_num FROM mmem.production_plan WHERE production_order_num = '${productionOrderNum}'`);
	return result;
}

module.exports = {
	getGanttChart,
	getActualGanttChart,
	productionOrderInfo,
	createProductionOrder,
	updateProductionOrder,
	dropdownProcess,
	dropdownProducionOrderNum,
	dropdownPartNum
};