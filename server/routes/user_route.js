const router = require('express').Router();
// const {wrapAsync} = require('../../util/util');

const {
    getUser
} = require('../controllers/user_controller');

router.route('/user')
    .get(getUser);

module.exports = router;