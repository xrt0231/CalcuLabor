require('dotenv').config();
const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Crypto hash
const Swal = require('sweetalert2'); //Sweet Alert2
const appleSignin = require("apple-signin-auth"); //Sign in with Apple ID
const env = process.env.NODE_ENV || 'production';
const { team_id, key, key_id} = process.env;


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
			audience: "lol.online.calculabor", // client id - The same one we used  on the frontend, this is the secret key used for encoding and decoding the token.
			ignoreExpiration: true, // Token will not expire unless you manually do so.
		  }
		);
		//console.log(userAppleId);
		//res.send(`<h2>Your Apple Id:${userAppleId}, \n ID_TOKEN:${id_token}, \n CODE:${code}</h2>`)
	  } catch (err) {
		// Token is not verified
		console.error(err);
	  }

	  const clientSecret = appleSignin.getClientSecret({
		clientID: 'lol.online.calculabor', // Apple Client ID
		teamID: team_id, // Apple Developer Team ID.
		privateKey: key, // private key associated with your client ID. -- Or provide a `privateKeyPath` property instead.
		keyIdentifier: key_id, // identifier of the private key.
		// OPTIONAL
		//expAfter: 15777000, // Unix time in seconds after which to expire the clientSecret JWT. Default is now+5 minutes.
	  });
	  console.log(clientID, teamID, privateKey, keyIdentifier);
	  
	  const options = {
		clientID: 'lol.online.calculabor', // Apple Client ID
		redirectUri: 'http://calculabor.online/api/1.0/apple/redirect', // use the same value which you passed to authorisation URL.
		clientSecret: clientSecret
	  };
	  
	  try {
		const tokenResponse = await appleSignin.getAuthorizationToken(code, options);
		res.send(`<h2>Your Apple Id:${userAppleId}, \n ID_TOKEN:${id_token}, \n CODE:${code}, ${tokenResponse}</h2>`)
	  } catch (err) {
		console.error(err);
	  }
}

//apple sign in verify
const appleVerify = async (req, res) => {
	// const { authorization, user } = req.body;
	// try {
	// 	const { sub: userAppleId } = await appleSignin.verifyIdToken(
	// 	  authorization.id_token, // We need to pass the token that we wish to decode.
	// 	  {
	// 		audience: "lol.online.calculabor", // client id - The same one we used  on the frontend, this is the secret key used for encoding and decoding the token.
	// 		ignoreExpiration: true, // Token will not expire unless you manually do so.
	// 	  }
	// 	);
	// 	console.log(userAppleId);
	//   } catch (err) {
	// 	// Token is not verified
	// 	console.error(err);
	//   }
}

module.exports = {
	userProfile, signUp, signIn, appleSignIn, appleVerify
};
