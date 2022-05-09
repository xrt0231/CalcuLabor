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
					setTimeout(function(){window.location.replace('/index.html')}, 2000);
				} else {}
			});
	}else {
		Swal.fire('Please sign in...');
		setTimeout(function(){window.location.replace('/index.html')}, 2000);
	}
} 

//User sign out
function signout(){
	localStorage.removeItem("Authorization");
	window.location.replace('/index.html');
	}
