
const {transaction, commit, rollback, query} = require('./mysqlcon');

const getDashboard = async()=> {
    await console.log('test');
    
 }


const dashboard1 = async(recordProcess, startDate, endDate)=> {
    console.log(recordProcess, startDate, endDate);
    let result = await query(`select *, concat((x.standard_working_hour/y.actual_working_hour)*100, "%") as efficiency from (
        select DATE_FORMAT(prrcd.start, '%Y/%m/%d') as date, sum(prrcd.output/prstd.standard_output) as standard_working_hour,  prrcd.record_process as process_refer
        from mmem.production_records prrcd
        join mmem.process_standard_output prstd
          on prstd.record_process = prrcd.record_process and prrcd.material_num = prstd.material_num
          group by date, process_refer) as x
    join (
        select DATE_FORMAT(wh.start, '%Y/%m/%d') as date, sum(TIME_TO_SEC(wh.end) - TIME_TO_SEC(wh.start))/3600 AS actual_working_hour, wh.record_process as process_refer
        from mmem.working_hour wh
        group by date, process_refer) as y
        
        ON x.date = y.date AND x.process_refer = y.process_refer
        
    WHERE x.process_refer = '${recordProcess}' AND x.date BETWEEN '${startDate}' AND '${endDate}'`);

    console.log(result);
    return result;
    

    }

const dashboard2 = async(startDate)=> {
    console.log(startDate);
    let result = await query(`select *, concat((x.standard_working_hour/y.actual_working_hour)*100, "%") as efficiency from (
        select DATE_FORMAT(prrcd.start, '%Y/%m/%d') as date, sum(prrcd.output/prstd.standard_output) as standard_working_hour,  prrcd.record_process as process_refer
        from mmem.production_records prrcd
        join mmem.process_standard_output prstd
            on prstd.record_process = prrcd.record_process and prrcd.material_num = prstd.material_num
            group by date, process_refer) as x
    join (
        select DATE_FORMAT(wh.start, '%Y/%m/%d') as date, sum(TIME_TO_SEC(wh.end) - TIME_TO_SEC(wh.start))/3600 AS actual_working_hour, wh.record_process as process_refer
        from mmem.working_hour wh
        group by date, process_refer) as y
        
        ON x.date = y.date AND x.process_refer = y.process_refer
        
    WHERE x.date = '${startDate}'`);

    console.log(result);
    return result;
    

    }

 module.exports = {
     getDashboard,
     dashboard1,
     dashboard2
 };