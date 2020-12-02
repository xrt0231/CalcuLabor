const router = require('express').Router();
// const {wrapAsync} = require('../../util/util');

const {
    getHour
} = require('../controllers/hour_controller');


router.route('/admin/hour')
    .get(getHour);

module.exports = router;