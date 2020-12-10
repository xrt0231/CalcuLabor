const router = require('express').Router();

// const {wrapAsync} = require('../../util/util');

const {
    signUp
} = require('../controllers/user_controller');

router.route('/signUp')
    .get(signUp);

module.exports = router;