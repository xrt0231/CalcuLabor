const router = require('express').Router();

// const {wrapAsync} = require('../../util/util');

const {
	userProfile, signUp, signIn, appleSignIn, googleRedirect, appleVerify, googleVerify
} = require('../controllers/user_controller');

router.route('/admin/userProfile')
	.post(userProfile);

router.route('/admin/signUp')
	.post(signUp);

router.route('/admin/signIn')
	.post(signIn);

//router.route('/apple/redirect')
	.post(appleSignIn)

router.route('/apple/verify')
	.post(appleVerify)

router.route('/google/redirect')
	.get(googleRedirect)

router.route('/google/verify')
	.post(googleVerify)

module.exports = router;