function fetchData (code){
	if(code){
		var productBarcode = code;

	} else {var productBarcode =  document.getElementById('productBarcode').value;}


	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
			productBarcode: productBarcode,
		})

	};

	fetch('/api/1.0/Coolermaster/productInformation', options)
		.then(response => {
			let message = response.json();
			console.log('fetching...');
			return message;
		})
		.then(result => {
			if (result) {
				console.log(result);
				console.log('API fetch success...')
				let productBarcode= result[0].product_id;
				let productModel= result[0].product_name;
				let warrantyFrom = result[0].warranty_from;
				let warrantyTo = result[0].warranty_to;
				let productImg = result[0].product_img;
				console.log(productImg);
				if(result[0]){

					document.getElementById('productBarcode').value = productBarcode;
					document.getElementById('productModel').value = productModel;
					document.getElementById('warrantyFrom').value = warrantyFrom;
					document.getElementById('warrantyTo').value = warrantyTo;
					document.getElementById('productImg').src= productImg;
					

				}else{

					// document.getElementById('MyInput').value = employeeId;
					// document.getElementById('start').value = start.toLocaleDateString() + ' ' + start.toLocaleTimeString();
				}
			} else {
				alert(result.msg);
			}
		});
}

