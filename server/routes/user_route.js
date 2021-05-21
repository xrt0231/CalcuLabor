const router = require('express').Router();

// const {wrapAsync} = require('../../util/util');

const {
	userProfile, signUp, signIn, appleSignIn 
} = require('../controllers/user_controller');

router.route('/admin/userProfile')
	.post(userProfile);

router.route('/admin/signUp')
	.post(signUp);

router.route('/admin/signIn')
	.post(signIn);

router.route('/apple/redirect')
	.post(appleSignIn)
	
module.exports = router;