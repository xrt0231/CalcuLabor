//Check if user sign in status
fetchUserData();
                
//User sign out
function signout(){
	localStorage.removeItem("Authorization");
	window.location.replace('/index.html');
}

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




function fetchUserData (){

	var token = localStorage.getItem('Authorization');
	if(token){
		let options = {
			headers: { 
				"Content-Type": "application/json"
			},
			method: "POST", 
			body: JSON.stringify({
				token:  token
			})
		};
        
		fetch('/api/1.0/admin/userProfile', options)
			.then(response => {
				let message = response.json();
				console.log('fetching...');
				return message;
			})
			.then(result => {

				if (result.name==='notSignIn') {
					console.log('API fetch success...')
					console.log(result)
					Swal.fire('Please sign in...');
					setTimeout(function(){window.location.replace('/index.html')}, 3000);
				} else {}
			});
	}else {
		Swal.fire('Please sign in...');
		setTimeout(function(){window.location.replace('/index.html')}, 3000);
	}
} 

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

			// Examine the text in the response  
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

//Dropdown list of production order number
document.getElementById("recordProcess").addEventListener("input", function (){
	let dropdown1 = document.getElementById('MyInputAuto');
	let MyInput = document.getElementById('MyInput');
	MyInput.value = "";
	dropdown1.innerHTML = "";
        
	let process = document.getElementById('recordProcess').value;
	const url1 = '/api/1.0/admin/dropdownProdOrdNum';
    
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
                
					console.log('data fetched ... ...')
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
//Dropdown list of part number
document.getElementById("MyInput").addEventListener("input", function (){
	let dropdown2 = document.getElementById('AutoPartNum');
	let MyInput = document.getElementById('partNum');
	partNum.value = "";
	dropdown2.innerHTML = "";
        
	let productionOrderNum = document.getElementById('MyInput').value;
	const url1 = '/api/1.0/admin/dropdownPartNum';
    
	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
			productionOrderNum: productionOrderNum
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
                
					console.log('data fetched ... ...')
					for (let i = 0; i < data.length; i++) {
						let option = document.createElement('option');
                
						option.value = data[i].part_num;
						dropdown2.appendChild(option);
					}    
				});  
			}  
		)  
		.catch(function(err) {  
			console.error('Fetch Error -', err);  
		});
});


function fetchData (code){

	if(code){
		var productionOrderNum = code;
	}else {var productionOrderNum = document.getElementById('MyInput').value;}

	// var recordProcess = document.getElementById('recordProcess').value;
	// var outputQty = document.getElementById('outputQty').value;
	// let today = new Date().toISOString().slice(0, 10);
	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
			productionOrderNum:  productionOrderNum,
        
			// recordProcess: recordProcess,
			// outputQty:  outputQty,
			// date: today
		})
   
	};
	console.log(productionOrderNum);

	fetch('/api/1.0/admin/getProductionData', options)
		.then(response => {
			let message = response.json();
			console.log('fetching...');
			return message;
		})
		.then(result => {
			if (result) {
				console.log(result)
				console.log('API fetch success...')
				if(result[0].actual_start){
            
					if(result[0].actual_end){
						let start = new Date(result[0].actual_start);
						start = start.toLocaleDateString() + ' ' + start.toLocaleTimeString();
						end = new Date(result[0].actual_end);
						end = end.toLocaleDateString() + ' ' + end.toLocaleTimeString();
						document.getElementById('MyInput').value = result[0].production_order_num;
						document.getElementById('partNum').value = result[0].part_num;
						document.getElementById('recordProcess').value = result[0].record_process;
						document.getElementById('outputQty').value = result[0].actual_output;
						const startValue = document.getElementById('start');
						startValue.value = start;
						const endValue = document.getElementById('end');
						endValue.value = end;

					}else{
						let start = new Date(result[0].actual_start);
						start = start.toLocaleDateString() + ' ' + start.toLocaleTimeString();
						end = "";
              
						document.getElementById('MyInput').value = result[0].production_order_num;
						document.getElementById('partNum').value = result[0].part_num;
						document.getElementById('recordProcess').value = result[0].record_process;
						document.getElementById('outputQty').value = result[0].actual_output;
						const startValue = document.getElementById('start');
						startValue.value = start;
						const endValue = document.getElementById('end');
						endValue.value = end;

					}
          
				}else
				{
					start = "";
					end = "";
              
					document.getElementById('MyInput').value = result[0].production_order_num;
					document.getElementById('partNum').value = result[0].part_num;
					document.getElementById('recordProcess').value = result[0].record_process;
					document.getElementById('outputQty').value = result[0].actual_output;
					const startValue = document.getElementById('start');
					startValue.value = start;
					const endValue = document.getElementById('end');
					endValue.value = end;
				}
            
            
				// const startValue = document.getElementById('start');
				// startValue.value = start;

				// const endValue = document.getElementById('end');
				// endValue.value = end;
            
			} else {
				alert(result.msg);
			}
		});
}

// fetch production order infomation from DB to make gantt chart
function fetchGanttChart() {
	let chart = document.getElementById('chart');
	chart.innerHTML = '';
	let data = [];
	let start = document.getElementById('start1').value;
	// let end = document.getElementById('end1').value;
	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
			start: start,
			// end: end
		})
        
	};
      
	fetch('/api/1.0/admin/ganttchartActual', options)
		.then(response => {
			let message = response.json();
			console.log('test');
			return message;
		})
		.then(result => {
			if (result) {
                
				console.log("API fetch success...");

				//create gantt chart data
				let ganttdata = {}
				for (let i=0; i<result.length; i+=1){
					start = moment(result[i].actual_start).format("YYYY-MM-DD HH:mm:ss");
					end = moment(result[i].actual_end).format("YYYY-MM-DD HH:mm:ss");
					ganttdata = {
						recordID: i+1,
						row: `${result[i].record_process}`,
						tooltip: `PN: ${result[i].part_num}, PO#: ${result[i].production_order_num}, Start: ${start}, End: ${end}`,
						start: `${start}`,
						end: `${end}`,
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
					// groupBy: "groupId,subGroupId",
					// groupByAlias: "group,subGroup",
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

function fastCheckInOut() {

	let productionOrderNum =  document.getElementById('MyInput');
	// let recordProcess = document.getElementById('recordProcess');
	// let start = document.getElementById('start');
	// let end = document.getElementById('end');
	let outputQty = document.getElementById('outputQty');

	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
			productionOrderNum: productionOrderNum.value,
			// recordProcess: recordProcess.value,
			// start: start.value,
			// end: end.value,
			outputQty: outputQty.value,
		})
        
	};
	productionOrderNum.value = '';
	recordProcess.value = '';
	start.value = '';
	end.value = '';
	outputQty.value = '';

	fetch('/api/1.0/admin/fastCheckInOut', options)
		.then(response => {
			let message = response.json();
			console.log('test');
			return message;
		})
		.then(result => {
			if(result){
				console.log(result);
				let productionOrderNum = result[0].production_order_num;
				let recordProcess = result[0].recordProcess;
				let startTime = new Date(result[0].actual_start);
				let endTime = new Date(result[0].actual_end);
				let =actualOutput = result[0].actual_output;
				startTime = startTime.toLocaleDateString() +' '+ startTime.toLocaleTimeString();
				endTime = endTime.toLocaleDateString() +' '+ endTime.toLocaleTimeString(); 
				if (endTime) {
					Swal.fire(`Production Order: ${productionOrderNum} @ Process ${recordProcess}, Actual start@: ${startTime} // Actual end@: ${endTime} Acutal output * ${actualOutput}`)
				}else{
					Swal.fire(`Production Order: ${productionOrderNum} @ Process ${recordProcess}, Actual start@: ${startTime} // Actual end@: NA Acutal output * NA`)
				} 
			}else{
				alert(result.msg);
			}
		});

}
