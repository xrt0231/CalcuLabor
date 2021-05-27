require('dotenv').config();
const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Crypto hash
const Swal = require('sweetalert2'); //Sweet Alert2
const appleSignin = require("apple-signin-auth"); //Sign in with Apple ID
const env = process.env.NODE_ENV || 'production';
const { client_id, team_id, key_id} = process.env;
const path = require('path');
var fs = require('fs');


//User profile
const userProfile = async (req, res) => {

	let token = req.body.token;
	console.log(token)
	token = token.slice(7);
    
	const user = (await User.userProfile(token));
	res.send(user);
};

//User Sign In
const signIn = async (req, res) => {
	const hash = crypto.createHash('sha256');
	let username = req.body.username;
	let password = req.body.password;

	hash.update(password);
	let encryptPassWord = hash.copy().digest('hex');

	console.log(encryptPassWord);
	const user = (await User.signIn(username, encryptPassWord));
	res.send(user);
};

//User Sign Up
const signUp = async (req, res) => {
	const hash = crypto.createHash('sha256');

	let password = req.body.password;
	let username = req.body.username;

	hash.update(password);
	let encryptPassWord = hash.copy().digest('hex');

	hash.update(username);
	let token = hash.copy().digest('hex');

	const user = (await User.signUp(username, encryptPassWord, token));
	res.send(user);
};

//apple sign in redirect
const appleSignIn = async (req, res) => {
	const { code, id_token } = req.body;
	
	try {
		const { sub: userAppleId } = await appleSignin.verifyIdToken(
		   id_token, // We need to pass the token that we wish to decode.
		  {
			audience: client_id, // client id - The same one we used  on the frontend, this is the secret key used for encoding and decoding the token.
			ignoreExpiration: true, // Token will not expire unless you manually do so.
		  }
		);
		
	  } catch (err) {
		// Token is not verified
		console.error(err);
	  }
      
	//   const clientSecret = appleSignin.getClientSecret({
	// 	clientID: client_id, // Apple Client ID
	// 	teamID: team_id, // Apple Developer Team ID.
	// 	privateKey: fs.readFileSync('./key.txt', 'utf8'), // private key associated with your client ID. -- Or provide a `privateKeyPath` property instead.
	// 	keyIdentifier: key_id, // identifier of the private key.
	// 	// OPTIONAL
	// 	//expAfter: 15777000, // Unix time in seconds after which to expire the clientSecret JWT. Default is now+5 minutes.
	//   });
	  
	//   const options = {
	// 	clientID: client_id, // Apple Client ID
	// 	redirectUri: 'https://calculabor.online/api/1.0/apple/redirect', // use the same value which you passed to authorisation URL.
	// 	clientSecret: clientSecret
	//   };
	  
	//   try {
	// 	const tokenResponse = await appleSignin.getAuthorizationToken(code, options);
	// 	try {
	// 		const { sub: userAppleId } = await appleSignin.verifyIdToken(tokenResponse.id_token, {
	// 		  // Optional Options for further verification - Full list can be found here https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
	// 		  //audience: client_id, // client id - can also be an array
	// 		  //nonce: 'NONCE', // nonce // Check this note if coming from React Native AS RN automatically SHA256-hashes the nonce https://github.com/invertase/react-native-apple-authentication#nonce
	// 		  // If you want to handle expiration on your own, or if you want the expired tokens decoded
	// 		  ignoreExpiration: true, // default is false
	// 		});
	// 		res.send(`<h2><a style="color: red; font-size: x-large;">access token >>></a> ${tokenResponse.access_token} "/n" <a style="color: red; font-size: x-large;">apple id >>></a> ${userAppleId} "/n" <a style="color: red; font-size: x-large;">id token >>></a> ${id_token} "/n" <a style="color: red; font-size: x-large;">code >>></a> ${code} </h2>`)
	// 	  } catch (err) {
	// 		// Token is not verified
	// 		console.error(err);
	// 	  }
	//   } catch (err) {
	// 	console.error(err);
	//   }
}
//apple sign in verify => response access token
const appleVerify = async (req, res) => {

	const { code } = req.body;
	
	const clientSecret = appleSignin.getClientSecret({
		clientID: client_id, // Apple Client ID
		teamID: team_id, // Apple Developer Team ID.
		privateKey: fs.readFileSync('./key.txt', 'utf8'), // private key associated with your client ID. -- Or provide a `privateKeyPath` property instead.
		keyIdentifier: key_id, // identifier of the private key.
		// OPTIONAL
		//expAfter: 15777000, // Unix time in seconds after which to expire the clientSecret JWT. Default is now+5 minutes.
	  });
	    
	  const options = {
		clientID: client_id, // Apple Client ID
		redirectUri: 'https://calculabor.online/api/1.0/apple/redirect', // use the same value which you passed to authorisation URL.
		clientSecret: clientSecret
	  };
	  
	  try {
		const tokenResponse = await appleSignin.getAuthorizationToken(code, options);
		// res.status(200).json({
		// 	accessToken: tokenResponse.access_token,
		// 	refreshToken: tokenResponse.refresh_token,
		//   })
		  console.log('step 2');
		  res.send(`<h2>Your access token is: ${tokenResponse.access_token} and refresh token is: ${tokenResponse.refresh_token}"/n" Apple ID is: ${userAppleId}</h2>`)
	  } catch (err) {
		console.error(err);
	  }
}

module.exports = {
	userProfile, signUp, signIn, appleSignIn, appleVerify
};
