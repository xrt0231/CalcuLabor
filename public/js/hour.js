
//Datetime picker function
$(function() {
	$('#start').datetimepicker();
});
			  
$(function() {
	$('#end').datetimepicker();
});
  
$(function() {
	$('#start1').datetimepicker();
});
			  
$(function() {
	$('#end1').datetimepicker();
});

//Dropdown list of production process
let dropdown = document.getElementById('recordProcessAuto');
const url = '/api/1.0/admin/dropdownProcess';

fetch(url)  
	.then(  
		function(response) {  
			if (response.status !== 200) {  
				console.warn('Looks like there was a problem. Status Code: ' + 
                    response.status);  
				return;  
			}

			response.json().then(function(data) {  
				let option;
              
				for (let i = 0; i < data.length; i++) {
					let option = document.createElement('option');
                   
					option.value = data[i].record_process;
					dropdown.appendChild(option);
				}    
			});  
		}  
	)  
	.catch(function(err) {  
		console.error('Fetch Error -', err);  
	});  
             
// fetch employee working hour infomation from DB
function fetchData (code){
	if(code){
		var employeeId = code;

	} else {var employeeId =  document.getElementById('MyInput').value;}

	var recordProcess = document.getElementById('recordProcess').value;
	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
			employeeId: employeeId,
			recordProcess: recordProcess,
		})

	};

	fetch('/api/1.0/admin/getHour', options)
		.then(response => {
			let message = response.json();
			console.log('fetching...');
			return message;
		})
		.then(result => {
			if (result) {
				console.log('API fetch success...')
				let employeeId = result[0].employee_id;
				let record_process = result[0].record_process;
				var start = new Date(result[0].recentStart);
				let end = new Date(result[0].recentEnd);
				if(result[0].recentEnd){

					document.getElementById('MyInput').value = employeeId;
					document.getElementById('start').value = start.toLocaleDateString() + ' ' + start.toLocaleTimeString();
					document.getElementById('end').value = end.toLocaleDateString() + ' ' + end.toLocaleTimeString();

				}else{

					document.getElementById('MyInput').value = employeeId;
					document.getElementById('start').value = start.toLocaleDateString() + ' ' + start.toLocaleTimeString();
				}
			} else {
				alert(result.msg);
			}
		});
}

// fetch production order infomation from DB to make gantt chart
function fetchGanttChart (){
	let data = [];
	var employeeId =  document.getElementById('MyInput').value;
	let today = new Date().toISOString().slice(0, 10);

	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
			date: today,
			employeeId: employeeId,
		})

	};

	fetch('/api/1.0/admin/getHourChart', options)
		.then(response => {
			let message = response.json();
			console.log('test');
			return message;
		})
		.then(result => {
			if (result) {

				console.log("data fetched...");

				//create gantt chart data
				let workHourData = {}
				for (let i=0; i<result.length; i+=1){
					start = moment(result[i].start).format("YYYY-MM-DD HH:mm:ss");
					end = moment(result[i].end).format("YYYY-MM-DD HH:mm:ss");
					workHourData = {
						recordID: i+1,
						row: `${result[i].record_process}`,
						tooltip: `ID: ${result[i].employee_id}, Process: ${result[i].record_process}, Start work @ ${start}, End work @ ${end}`,
						start: `${start}`,
						end: `${end}`,
					}
					data.push(workHourData); 
				}
				//An API call to grab data
				function refreshFunction() {
  
					return data;
				}

				//Parameters that the chart expects
				let params = {
					sidebarHeader: "Unused right now",
					noDataFoundMessage: "No data found",
					startTimeAlias: "start",
					endTimeAlias: "end",
					idAlias: "recordID",
					rowAlias: "row",
					linkAlias: null,
					tooltipAlias: "tooltip",
					refreshFunction: refreshFunction
				}

				//Create the chart.
				//On first render the chart will call its refreshData function on its own.
				let ganttChart = new Gantt("chart", params);

				//To refresh the chart's data
				ganttChart.refreshData();
                  

			} else {
				alert(result.msg);
			}
		});
}

// fetch to clock in/out from DB
function clockInOut (){

	var employeeId =  document.getElementById('MyInput');
	var recordProcess = document.getElementById('recordProcess');
	var start = document.getElementById('start');
	var end = document.getElementById('end');
	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
			employeeId: employeeId.value,
			recordProcess: recordProcess.value,
			start: start.value,
			end: end.value,
		})

	};

	employeeId.value = '';
	recordProcess.value = '';
	start.value = '';
	end.value = '';

	fetch('/api/1.0/admin/clockInOut', options)
		.then(response => {
			let message = response.json();
			console.log('fetching...');
			return message;
		})
		.then(result => {
			if (result[0]) {
				console.log('data fetched...');
				let employeeId = result[0].employee_id;
				let record_process = result[0].record_process;
				let start = new Date(result[0].recentStart);
				let end = new Date(result[0].recentEnd);

				start = start.toLocaleDateString() +' '+ start.toLocaleTimeString();
				end = end.toLocaleDateString() +' '+ end.toLocaleTimeString();

				if(result[0].recentEnd){
					Swal.fire(`employee_ID: ${employeeId}, record_process: ${record_process}, clock in: ${start} // clock out: ${end}`)
				}else{
					Swal.fire(`employee_ID: ${employeeId}, record_process: ${record_process}, clock in: ${start} // clock out: NA`)
				}

			} else {
				alert(result.msg);
			}
		});
}