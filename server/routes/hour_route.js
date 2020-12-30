const router = require('express').Router();
// const {wrapAsync} = require('../../util/util');

const {
	getHour,
	getHourChart,
	clockInOut
} = require('../controllers/hour_controller');

router.route('/admin/getHour')
	.post(getHour);

router.route('/admin/getHourChart')
	.post(getHourChart);

router.route('/admin/clockInOut')
	.post(clockInOut);

module.exports = router;