const router = require('express').Router();
// const {wrapAsync} = require('../../util/util');

const {
    getHour,
    getHourChart
} = require('../controllers/hour_controller');

router.route('/admin/getHour')
    .post(getHour);

router.route('/admin/getHourChart')
    .post(getHourChart);

module.exports = router;