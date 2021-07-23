require('dotenv').config();
const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const jwt_decode = require("jwt-decode"); //JWT decode
const crypto = require('crypto'); // Crypto hash
const Swal = require('sweetalert2'); //Sweet Alert2
const appleSignin = require("apple-signin-auth"); //Sign in with Apple
const {OAuth2Client} = require('google-auth-library'); //Sign in with Google
const env = process.env.NODE_ENV || 'production';
const { client_id, team_id, key_id, gclient_id} = process.env;
const path = require('path');
var fs = require('fs');
var nodemailer = require("nodemailer");


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

//Apple sign in redirect
const appleSignIn = async (req, res) => {
	// Frontend arranges the sign in flow already, leave blank here.
}

//Apple sign in verify => response access token & get AppleID
const appleVerify = async (req, res) => {

	let code = req.body.code;
	
	const clientSecret = appleSignin.getClientSecret({
		clientID: 'lol.online.calculabor', // Apple Client ID
		teamID: team_id, // Apple Developer Team ID.
		privateKey: fs.readFileSync('./key.txt', 'utf8'), // private key associated with your client ID. -- Or provide a `privateKeyPath` property instead.
		keyIdentifier: key_id, // identifier of the private key.
		// OPTIONAL
		//expAfter: 15777000, // Unix time in seconds after which to expire the clientSecret JWT. Default is now+5 minutes.
	  });
	    
	  const options = {
		//clientID: client_id, // Apple Client ID
		clientID: 'lol.online.calculabor',
		redirectUri: 'https://calculabor.online/api/1.0/apple/redirect', // use the same value which you passed to authorisation URL.
		clientSecret: clientSecret
	  };
	  
	  try {
		const tokenResponse = await appleSignin.getAuthorizationToken(code, options);
		// res.status(200).json({
		// 	accessToken: tokenResponse.access_token,
		// 	refreshToken: tokenResponse.refresh_token,
		//  })
		var decoded = jwt_decode(tokenResponse.id_token);
        console.log(decoded);

		try{
			const { sub: userAppleId } = await appleSignin.verifyIdToken(tokenResponse.id_token, {
				audience: 'lol.online.calculabor', // Apple Client ID
			});

			const hash = crypto.createHash('sha256');

			hash.update(userAppleId);
	        let token = hash.copy().digest('hex');
			 
			let appleToken = token;
	        let username = userAppleId;
			let appleEmail = decoded.email;

			const user = (await User.signInApple(username, appleToken, appleEmail));
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

//Google sign in redirect
const googleRedirect = async (req, res) => {
	// Frontend arranges the sign in flow already, leave blank here.
}

//Google sign in verify => response access token
const googleVerify = async (req, res) => {
  
  let token = req.body.token;
  const client = new OAuth2Client(gclient_id);
  async function verify() {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: gclient_id,
      
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  
  const hash = crypto.createHash('sha256');

  
  let googleToken = payload.sub;
  let username = payload.given_name;
  let googleEmail = payload.email;

  const user = (await User.signInGoogle(username, googleToken, googleEmail));
  res.send(user);
}
verify().catch(console.error);
}

const sesMail = async (req, res) => {

	var transport = nodemailer.createTransport({ // Yes. SMTP!
        host: "email-smtp.us-east-2.amazonaws.com", // Amazon email SMTP hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        auth: {
            user: "AKIAQQ2T3Q2EC77LGZNL", // Use from Amazon Credentials
            pass: "BPnT5J1HeRNSIGT0KamAefxgSZWUkcQ7EaNqu7CEehIm" // Use from Amazon Credentials
        }
    });

    var mailOptions = {
        from: "jonathan@4idps.com", // sender address
        to: "carina630@gmail.com", // list of receivers
        subject: "User registerd", // Subject line
        html: "<b>I love you~</b>" // email body
    };

    // send mail with defined transport object
    transport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    
        transport.close(); // shut down the connection pool, no more messages
    });

    res.send('OK');
}
module.exports = {
	userProfile, signUp, signIn, appleSignIn, appleVerify, googleRedirect, googleVerify, sesMail
};
