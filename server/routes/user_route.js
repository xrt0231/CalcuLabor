const router = require('express').Router();

// const {wrapAsync} = require('../../util/util');

const {
    signUp, signIn, userProfile
} = require('../controllers/user_controller');

router.route('/admin/signUp')
    .post(signUp);

router.route('/admin/signIn')
    .post(signIn);

router.route('/admin/userProfile')
    .post(signIn);

module.exports = router;