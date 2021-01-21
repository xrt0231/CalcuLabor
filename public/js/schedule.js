// Datetime picker function      
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
             
// fetch production order infomation from DB
function fetchData (code){
	if(code){
		var productionOrderNum =  code;
	}else {var productionOrderNum = document.getElementById('MyInput').value;}
	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
			productionOrderNum:  productionOrderNum,
		})
                
	};
            
	fetch('/api/1.0/admin/productionOrderInfo', options)
		.then(response => {
			let message = response.json();
			console.log('fetching...');
			return message;
		})
		.then(result => {
			if (result) {
				console.log('data fetched...');
				let productionOrderNum = result[0].production_order_num
				let record_process = result[0].record_process;
				let part_num = result[0].part_num;
				let outputQty = result[0].output;
				let start = new Date(result[0].start);
				let end = new Date(result[0].end);
                        
				document.getElementById('MyInput').value = productionOrderNum;
				document.getElementById('recordProcess').value = record_process;
				document.getElementById('partNum').value = part_num;
				document.getElementById('outputQty').value = outputQty;
                        
				document.getElementById('end').value = end;
				start = start.toDateString() + ' ' + start.toTimeString();
				end = end.toDateString() + ' ' + end.toTimeString();
                        
				const startValue = document.getElementById('start');
				startValue.value = start;

				const endValue = document.getElementById('end');
				endValue.value = end;
                        
			} else {

				alert(result.msg);
			}
		});
}
            
//fetch production order infomation from DB to make gantt chart
function fetchGanttChart() {
	let chart = document.getElementById('chart');
	chart.innerHTML = '';
	let data = [];
	// let today = new Date().toISOString().slice(0, 10);
	let start = document.getElementById('start1').value;
	// let end = document.getElementById('end1').value;
	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
			// date: today
			start: start,
			// end: end
		})
                    
	};
                  
	fetch('/api/1.0/admin/ganttchart', options)
		.then(response => {
			let message = response.json();
			console.log('test');
			return message;
		})
		.then(result => {
			if (result) {
                            
				console.log("API fetched...");

				//create gantt chart data
				let ganttdata = {}
				for (let i=0; i<result.length; i+=1){
					start = moment(result[i].start).format("YYYY-MM-DD HH:mm:ss");
					end = moment(result[i].end).format("YYYY-MM-DD HH:mm:ss");
					ganttdata = {
						recordID: i+1,
						row: `${result[i].record_process}`,
						tooltip: `PN: ${result[i].part_num}, PO#: ${result[i].production_order_num}, Start: ${start}, End: ${end}`,
						start: `${result[i].start}`,
						end: `${result[i].end}`,
					}
					data.push(ganttdata);
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

//Create production order function
function createProductionOrder() {
                  
	let productionOrderNum =  document.getElementById('MyInput').value;
	let partNum = document.getElementById('partNum').value;
	let recordProcess = document.getElementById('recordProcess').value;
	let start = document.getElementById('start').value;
	let end = document.getElementById('end').value;
	let outputQty = document.getElementById('outputQty').value;

	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
			productionOrderNum: productionOrderNum,
			partNum: partNum,
			recordProcess: recordProcess,
			start: start,
			end: end,
			outputQty: outputQty,
		})
                      
	};
	productionOrderNum.value = '';
	partNum.value = '';
	recordProcess.value = '';
	start.value = '';
	end.value = '';
	outputQty.value = '';

	fetch('/api/1.0/admin/createProductionOrder', options)
		.then(response => {
			let message = response.json();
			console.log('test');
			return message;
		})
		.then(result => {
			if (result) {
				console.log("API fetched...");
				let productionOrderNum = result[0].production_order_num
				let record_process = result[0].record_process;
				let part_num = result[0].part_num;
				let outputQty = result[0].output;
				let start = new Date(result[0].start);
				let end = new Date(result[0].end);
                    
				start = start.toLocaleDateString() + ' ' + start.toLocaleTimeString();
				end = end.toLocaleDateString() + ' ' + end.toLocaleTimeString();
                                  
				document.getElementById('orderCreated').innerHTML = `<h3> <div class="col-md-6" style="font-size: 15px">
                                                                                      Production oreder #: <a style="color: darkblue" "font-weight: bold";>${productionOrderNum}</a> has been created...<br><br>
                                                                                      Production #: ${productionOrderNum}<br>
                                                                                      Process: ${recordProcess}<br>
                                                                                      part number#: ${partNum}<br>
                                                                                      Planned output: ${outputQty}<br>
                                                                                      Planned start time: ${start}<br>
                                                                                      Planned end time: ${end}
                                                                                      </div><h3>`; 
			} else {
				alert(result.msg);
			}
		});

}

//Update production order function
function updateProductionOrder() {
                  
	let productionOrderNum =  document.getElementById('MyInput');
	let partNum = document.getElementById('partNum');
	let recordProcess = document.getElementById('recordProcess');
	let start = document.getElementById('start');
              
	let end = document.getElementById('end');
	let outputQty = document.getElementById('outputQty');

	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
			productionOrderNum: productionOrderNum.value,
			partNum: partNum.value,
			recordProcess: recordProcess.value,
			start: start.value,
			end: end.value,
			outputQty: outputQty.value,
		})
                      
	};
	productionOrderNum.value = '';
	partNum.value = '';
	recordProcess.value = '';
	start.value = '';
	end.value = '';
	outputQty.value = '';

	fetch('/api/1.0/admin/updateProductionOrder', options)
		.then(response => {
			let message = response.json();
			console.log('test');
			return message;
		})
		.then(result => {
			if (result) {
				console.log("API fetched...");
				let productionOrderNum = result[0].production_order_num
				let recordProcess = result[0].record_process;
				let partNum = result[0].part_num;
				let outputQty = result[0].output;
				let start = new Date(result[0].start);
				let end = new Date(result[0].end);
                      
				start = start.toLocaleDateString() + ' ' + start.toLocaleTimeString();
				end = end.toLocaleDateString() + ' ' + end.toLocaleTimeString();
                                    
				document.getElementById('orderCreated').innerHTML = `<h3>
                                                                                      <div class="col-md-6" style="font-size: 15px">
                                                                                      Production oreder #: <a style="color: darkbule"><strong>${productionOrderNum}</strong></a> has been updated...<br><br>
                                                                                      Production #: ${productionOrderNum}<br>
                                                                                      Process: ${recordProcess}<br>
                                                                                      part number#: ${partNum}<br>
                                                                                      Planned output: ${outputQty}<br>
                                                                                      Planned start time: ${start}<br>
                                                                                      Planned end time: ${end}
                                                                                      </div>
                                                                                      <h3>`; 
			} else {
				alert(result.msg);
			}
		});

}

//Dropdown list of production order number
document.getElementById("recordProcess").addEventListener("input", function (){
	let dropdown1 = document.getElementById('MyInputAuto');
	let MyInput = document.getElementById('MyInput');
	MyInput.value = "";
	dropdown1.innerHTML = "";
                        
	let process = document.getElementById('recordProcess').value;
	const url1 = '/api/1.0/admin/dropdownProductionOrderNum';
                    
	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
			process: process
		})
                            
	};  


	fetch(url1, options)  
		.then(  
			function(response) {  
				if (response.status !== 200) {  
					console.warn('Looks like there was a problem. Status Code: ' + 
                                  response.status);  
					return;  
				}

				// Examine the text in the response  
				response.json().then(function(data) {  
					let option;
                                
					console.log('data fetched...')
					for (let i = 0; i < data.length; i++) {
						let option = document.createElement('option');
                                
						option.value = data[i].production_order_num;
						dropdown1.appendChild(option);
					}    
				});  
			}  
		)  
		.catch(function(err) {  
			console.error('Fetch Error -', err);  
		});
                      
                      
                      
});



       