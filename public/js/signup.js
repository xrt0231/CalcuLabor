//fetch user data
function fetchData (){
	let username = document.getElementById('username').value;
	let password = document.getElementById('password').value;
	if(username){
		if(password){
			let options = {
				headers: {
					"Content-Type": "application/json"
				},
				method: "POST", 
				body: JSON.stringify({
					username:  username,
					password: password
				})
			};
            
			fetch('/api/1.0/admin/signUp', options)
				.then(response => {
					let message = response.json();
					console.log('fetching...');
					return message;
				})
				.then(result => {
					if (result.name==='existed') {
						console.log('data fetched...')
						Swal.fire('User already in system, please sign in')
						setTimeout(function(){window.location.replace('signin.html')}, 2500)
                                
					} else {
						localStorage.setItem('Authorization', 'Bearer ' + result[0].access_token);
						window.location.replace('index.html')
					}
				});
		}else {
			Swal.fire('Please choose your password')
		}		
	}else {
		Swal.fire('Please choose your username');
	}
}