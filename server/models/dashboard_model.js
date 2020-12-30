
const {transaction, commit, rollback, query} = require('./mysqlcon');

const dashboard1 = async(recordProcess, startDate, endDate)=> {
	console.log(recordProcess, startDate, endDate);
	let result = await query(

		`select *, x.actual_output , x.standard_output, concat((x.standard_working_hour/y.actual_working_hour)*100) as efficiency from (
            select DATE_FORMAT(pp.actual_start, '%Y/%m/%d') as date, sum(pp.actual_output) AS actual_output, sum(prstd.standard_output) AS standard_output ,sum(pp.actual_output/prstd.standard_output) as standard_working_hour,  
            pp.record_process as process_refer
            from mmem.production_plan pp
            join mmem.process_standard_output prstd
              on prstd.record_process = pp.record_process and prstd.part_num = pp.part_num
              group by date, process_refer) as x
        join (
            select DATE_FORMAT(wh.start, '%Y/%m/%d') as date, sum(TIME_TO_SEC(wh.end) - TIME_TO_SEC(wh.start))/3600 AS actual_working_hour, wh.record_process as process_refer
            from mmem.working_hour wh
            group by date, process_refer) as y
            
            ON x.date = y.date AND x.process_refer = y.process_refer
            
            WHERE x.process_refer = '${recordProcess}' AND x.date BETWEEN '${startDate}' AND '${endDate}'`
	);
	return result;
    
}

const dashboard2 = async(startDate)=> {
     
	let result = await query(

		`select *, x.actual_output , x.standard_output, concat((x.standard_working_hour/y.actual_working_hour)*100) as efficiency from (
                select DATE_FORMAT(pp.actual_start, '%Y/%m/%d') as date, sum(pp.actual_output) AS actual_output, sum(prstd.standard_output) AS standard_output ,sum(pp.actual_output/prstd.standard_output) as standard_working_hour,  
                pp.record_process as process_refer
                from mmem.production_plan pp
                join mmem.process_standard_output prstd
                  on prstd.record_process = pp.record_process and prstd.part_num = pp.part_num
                  group by date, process_refer) as x
            join (
                select DATE_FORMAT(wh.start, '%Y/%m/%d') as date, sum(TIME_TO_SEC(wh.end) - TIME_TO_SEC(wh.start))/3600 AS actual_working_hour, wh.record_process as process_refer
                from mmem.working_hour wh
                group by date, process_refer) as y
                
                ON x.date = y.date AND x.process_refer = y.process_refer
                WHERE x.date = '${startDate}'`

	)
	return result;

}
module.exports = {
	dashboard1,
	dashboard2
};