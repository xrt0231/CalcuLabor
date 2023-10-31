
fetchUserData ();
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
				let name = result.name;
				let email = result.email;
				if (result.name==='notSignIn') {
					console.log('API fetch success...')
					window.location.replace('/index.html');
				} else if (result.provider !== 'apple'){
					document.getElementById('profile').innerHTML = `Hello, ${name}`;     
				} else {
					document.getElementById('profile').innerHTML = `Hello, ${email}`;
				}
			});
	}else {
		console.log('user not sign in...');
	}
} 

//Sign in with Apple
AppleID.auth.init({
	clientId : 'lol.online.calculabor',
	scope : "name email",
	redirectURI : 'https://calculabour.com/api/1.0/apple/redirect',
	state : "",
	nonce : "",
	usePopup : true //or false defaults to false
});

console.log("redirect page----")

if (typeof window !== "undefined") {
  console.log("window", window);
  document.addEventListener("AppleIDSignInOnSuccess", async data => {
	console.log("AppleIDSignInOnSuccess", data);

	try {
	  const data = await AppleID.auth.signIn();
	  console.log("data", data);

	  let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
			code: data.authorization.code,
		})
	  };	

	  fetch('/api/1.0/apple/verify', options)
		.then(response => response.json())

		.then(data => {
		console.log('Success:', data);
		window.location.replace('/index.html');
		localStorage.setItem('Authorization', 'Bearer ' + data[0].access_token);
		})	

		.catch((error) => {
		console.error('Error:', error);
		});

	} catch (error) {
	  //handle error.
	}

  });
    //Listen for authorization failures
	document.addEventListener("AppleIDSignInOnFailure", error => {
	console.log("AppleIDSignInOnFailure", error);
	});

//Sign in with Google
function onSignIn(googleUser) {

	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST", 
		body: JSON.stringify({
			token: googleUser.getAuthResponse().id_token,
		})
	};	

	fetch('/api/1.0/google/verify', options)
	.then(response => response.json())

	.then(data => {
	console.log('Success');
	localStorage.setItem('Authorization', 'Bearer ' + data[0].access_token);
	setTimeout(function(){window.location.replace('/index.html')}, 6000);
    })	

	.catch((error) => {
	console.error('Error:', error);
	});
}

	function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
	console.log('User signed out.');
	});
	localStorage.removeItem("Authorization");
	window.location.replace('/index.html');
	}

	function onFailure(error) {
	console.log(error);
	}

	}
