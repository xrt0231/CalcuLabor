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
