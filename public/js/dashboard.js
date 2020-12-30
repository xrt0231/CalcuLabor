//Date picker function
$(document).ready(function(){
	var date_input=$('input[name="date"]'); 
	var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
	var options={
		format: 'yyyy/mm/dd',
		container: container,
		todayHighlight: true,
		autoclose: true,
	};
	date_input.datepicker(options);
})  

//user sign out 
function signout(){
	localStorage.removeItem("Authorization");
	window.location.replace('/index.html');
}


//Chcekc if user signed in
fetchUserData ()

function fetchUserData (){

	var token = localStorage.getItem('Authorization');
	if(token){
		console.log(token);
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

//Define process return multiple days efficiency
function dashboard1() {

	let dateArr = [];
	let actualWorkingHourArr = [];
	let standardWorkingHourArr = [];
	let actualOutputArr = [];
	let standardOutputArr = [];
	let efficiency = [];

	let startDate =  document.getElementById('startDate').value;
	let endDate = document.getElementById('endDate').value;
	let recordProcess = document.getElementById('recordProcess').value;

	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
                  
			startDate: startDate,
			endDate: endDate,
			recordProcess: recordProcess
                  
		})
              
	};
            
	fetch('/api/1.0/admin/dashboard1', options)
		.then(response => {
			let message = response.json();
			console.log('test');
			return message;
		})
		.then(result => {
			if (result) {
				console.log(result)

				for (let i=0; i<result.length; i+=1){

					dateArr.push(result[i].date);
					actualWorkingHourArr.push(result[i].actual_working_hour);
					standardWorkingHourArr.push(result[i].standard_working_hour);
					efficiency.push(Number(result[i].efficiency));

				}

				//Update high chart options
				container1.update({
					title: {text: result[0].process_refer},
					xAxis: [{
						categories: dateArr,
					}],
					legend: {
						layout: 'vertical',
						align: 'left',
						x: 75,
						verticalAlign: 'top',
						y: 35,
						floating: true,
						backgroundColor:
                            Highcharts.defaultOptions.legend.backgroundColor || // theme
                            'rgba(255,255,255,0.25)'
					},
				})

				//Update high chart series
				container1.series[0].update({ data: actualWorkingHourArr }, false)
				container1.series[1].update({ data: standardWorkingHourArr }, false)
				container1.series[2].update({ data: efficiency }, false)
                      
				//redraw high chart
				container1.redraw();
                      
			} else {
				alert(result.msg);
			}
		});
}

//Define date return multiple process efficiency
function dashboard2() {

	let process = [];
	let actualOutputArr = [];
	let standardOutputArr = [];
	let efficiency = [];

	let startDate =  document.getElementById('startDate2').value;

	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
                  
			startDate: startDate,
                  
		})
              
	};
            
	fetch('/api/1.0/admin/dashboard2', options)
		.then(response => {
			let message = response.json();
			console.log('test');
			return message;
		})
		.then(result => {
			if (result) {
				console.log(result)

				for (let i=0; i<result.length; i+=1){

					process.push(result[i].process_refer)
					actualOutputArr.push(result[i].actual_output);
					standardOutputArr.push(result[i].standard_output);
					efficiency.push(Number(result[i].efficiency));

				}
				console.log(process, actualOutputArr, standardOutputArr, efficiency);

				//Update high chart options
				container2.update({
					title: {text: startDate},
					xAxis: [{
						categories: process,
					}],
					legend: {
						layout: 'vertical',
						align: 'left',
						x: 75,
						verticalAlign: 'top',
						y: 35,
						floating: true,
						backgroundColor:
                            Highcharts.defaultOptions.legend.backgroundColor || // theme
                            'rgba(255,255,255,0.25)'
					},
				})

				//Update high chart series
				container2.series[0].update({ data: actualOutputArr }, false)
				container2.series[1].update({ data: standardOutputArr }, false)
				container2.series[2].update({ data: efficiency }, false)
                      
				//redraw high chart
				container2.redraw();
                      
			} else {
				alert(result.msg);
			}
		});
          
}

//high chart left start
let option4container1 = {
	chart: {
		zoomType: 'xy'
	},
	title: {
		text: ''
	},

	exporting: {
		enabled: false
	},
	xAxis: [{
		categories: [],
		crosshair: true
	}],
	yAxis: [{ // Primary yAxis
		labels: {
			format: '{value} Hrs',
			style: {
				color: Highcharts.getOptions().colors[1]
			}
		},
		title: {
			text: 'Working hours',
			style: {
				color: Highcharts.getOptions().colors[1]
			}
		}
	}, { // Secondary yAxis
		title: {
			text: 'Efficiency',
			style: {
				color: Highcharts.getOptions().colors[0]
			}
		},
		labels: {
			format: '{value} %',
			style: {
				color: Highcharts.getOptions().colors[0]
			}
		},
		opposite: true
	}],
	tooltip: {
		shared: true
	},

	series: [{
		name: 'Actual working hour',
		type: 'column',

		data: [],
		tooltip: {
			valueSuffix: ' Hours'
		}

	},{
		name: 'Standard working hour',
		type: 'column',

		data: [],
		tooltip: {
			valueSuffix: ' Hours'
		}

	}
	, {
		name: 'Efficiency',
		type: 'spline',
		yAxis: 1,
		data: [],
		tooltip: {
			valueSuffix: '%'
		}
	}]
}

let container1 = Highcharts.chart('container1', option4container1);

//==================================================================

//high chat right start
let option4container2 = {
	chart: {
		zoomType: 'xy'
	},
	title: {
		text: ''
	},

	exporting: {
		enabled: false
	},
	xAxis: [{
		categories: [],
		crosshair: true
	}],
	yAxis: [{ // Primary yAxis
		labels: {
			format: '{value} Pcs',
			style: {
				color: Highcharts.getOptions().colors[1]
			}
		},
		title: {
			text: 'Output',
			style: {
				color: Highcharts.getOptions().colors[1]
			}
		}
	}, { // Secondary yAxis
		title: {
			text: 'Efficiency',
			style: {
				color: Highcharts.getOptions().colors[0]
			}
		},
		labels: {
			format: '{value} %',
			style: {
				color: Highcharts.getOptions().colors[0]
			}
		},
		opposite: true
	}],
	tooltip: {
		shared: true
	},

	series: [{
		name: 'Actual output',
		type: 'column',

		data: [],
		tooltip: {
			valueSuffix: ' Pcs'
		}

	},{
		name: 'Standard output',
		type: 'column',

		data: [],
		tooltip: {
			valueSuffix: ' Pcs'
		}

	}
	, {
		name: 'Efficiency',
		type: 'spline',
		yAxis: 1,
		data: [],
		tooltip: {
			valueSuffix: '%'
		}
	}]
}

let container2 = Highcharts.chart('container2', option4container2);    

