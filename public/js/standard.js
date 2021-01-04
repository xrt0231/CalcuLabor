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
            
// fetch standard infomation from DB to make gantt chart
function fetchData() {
             
	let recordProcess = document.getElementById('recordProcess').value;
	let partNum = document.getElementById('partNum').value;
                
	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify({
			recordProcess: recordProcess,
			partNum: partNum
		})
	};

	partNum.value = '';
	recordProcess.value = '';
                  
	fetch('/api/1.0/admin/getStandard', options)
		.then(response => {
			let message = response.json();
			console.log('test');
			return message;
		})
		.then(result => {
			if (result) {    
				console.log("data fetched...");
				let record_process = result[0].record_process;
				let part_num = result[0].part_num;
				let outputStandard = result[0].standard_output;
                    
				document.getElementById('recordProcess').value = recordProcess;
				document.getElementById('partNum').value = partNum;
				document.getElementById('outputStandard').value = outputStandard;
                                                
			} else {
				alert(result.msg);
			}
		});
}

//Create production standard function
function createStandard() {
                  
	let recordProcess = document.getElementById('recordProcess').value;
	let partNum = document.getElementById('partNum').value;
	let outputStandard = document.getElementById('outputStandard').value;

	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
                          
			partNum: partNum,
			recordProcess: recordProcess,
			outputStandard: outputStandard,
		})
                      
	};
                    
	partNum.value = '';
	recordProcess.value = '';
	outputStandard.value = '';

	fetch('/api/1.0/admin/createStandard', options)
		.then(response => {
			let message = response.json();
			console.log('test');
			return message;
		})
		.then(result => {
			if (result) {
				console.log("data fetched...");
                            
				let record_process = result[0].record_process;
				let part_num = result[0].part_num;
				let outputStandard = result[0].standard_output;
                    
				document.getElementById('standardCreated').innerHTML = `<h3> <div class="col-md-6" style="font-size: 15px">
                                                                                      Production standard has been created...<br><br>
                                                                                      
                                                                                      Process: ${recordProcess}<br>
                                                                                      part number#: ${partNum}<br>
                                                                                      Standard output: ${outputStandard}<br>
                                                        
                                                                                      </div><h3>`; 
			} else {
				alert(result.msg);
			}
		});

}
//Update production standard function
function updateStandard() {
                  
	let partNum = document.getElementById('partNum');
	let recordProcess = document.getElementById('recordProcess');
	let outputQty = document.getElementById('outputStandard');

	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
                          
			partNum: partNum.value,
			recordProcess: recordProcess.value,
			outputStandard: outputStandard.value,
		})
                      
	};
                    
	partNum.value = '';
	recordProcess.value = '';
	outputStandard.value = '';

	fetch('/api/1.0/admin/updateStandard', options)
		.then(response => {
			let message = response.json();
			console.log('test');
			return message;
		})
		.then(result => {
			if (result) {
				console.log("data fetched...");     
				let recordProcess = result[0].record_process;
				let partNum = result[0].part_num;
				let outputStandard = result[0].standard_output;
             
				document.getElementById('standardCreated').innerHTML = `<h3>
                                                                                      <div class="col-md-6" style="font-size: 15px">
                                                                                      Production standard has been updated...<br><br>
                                                                                      
                                                                                      Process: ${recordProcess}<br>
                                                                                      part number#: ${partNum}<br>
                                                                                      Standard output: ${outputStandard}<br>
                                                                                    
                                                                                      </div>
                                                                                      <h3>`; 
			} else {
				alert(result.msg);
			}
		});

}

//Dropdown list of part number (production standard)
document.getElementById("recordProcess").addEventListener("input", function (){
	let dropdown2 = document.getElementById('AutoPartNum');
	let partNum = document.getElementById('partNum');
	partNum.value = "";
	dropdown2.innerHTML = "";
     
	let recordProcess = document.getElementById('recordProcess').value;
	const url = '/api/1.0/admin/dropdownPartNum1';
	console.log(recordProcess);
	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
			recordProcess: recordProcess
		})
                            
	};  
	console.log(recordProcess);

	fetch(url, options)  
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