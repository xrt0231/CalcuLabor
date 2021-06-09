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
	// Frontend arranges the sign in flow already, leave blank here.
}
//apple sign in verify => response access token & get AppleID
const appleVerify = async (req, res) => {

	let code = req.body.code;
	console.log(code);
	
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
		//  })
		try{
			const { sub: userAppleId } = await appleSignin.verifyIdToken(tokenResponse.id_token, {
				audience: client_id, // Apple Client ID
			});

			const hash = crypto.createHash('sha256');

			hash.update(userAppleId);
	        let token = hash.copy().digest('hex');

			let appleToken = token;
	        let username = userAppleId;

			const user = (await User.signInApple(username, appleToken));
			res.send(user);
		}
		catch (err) {
			// Token is not verified
			console.error(err);
		}
	  } catch (err) {
		console.error(err);
	  }
}

//Google sign in
const googleRedirect = async (req, res) => {

}

module.exports = {
	userProfile, signUp, signIn, appleSignIn, appleVerify, googleRedirect,
};
