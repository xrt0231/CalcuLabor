const router = require('express').Router();

// const {wrapAsync} = require('../../util/util');

const {
	userProfile, signUp, signIn, appleSignIn, appleVerify 
} = require('../controllers/user_controller');

router.route('/admin/userProfile')
	.post(userProfile);

router.route('/admin/signUp')
	.post(signUp);

router.route('/admin/signIn')
	.post(signIn);

router.route('/apple/redirect')
	.post(appleSignIn)

router.route('/apple/redirect')
	.get(appleSignIn)

router.route('/apple/verify')
	.post(appleVerify)

router.route('/apple/verify')
	.get(appleVerify)
	
module.exports = router;