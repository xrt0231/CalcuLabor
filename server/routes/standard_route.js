const router = require('express').Router();
// const {wrapAsync} = require('../../util/util');

const {
	dropdownPartNum, getStandard, createStandard, updateStandard
} = require('../controllers/standard_controller');

router.route('/admin/dropdownPartNum1')
	.post(dropdownPartNum);

router.route('/admin/getStandard')
	.post(getStandard);

router.route('/admin/createStandard')
	.post(createStandard);

router.route('/admin/updateStandard')
	.post(updateStandard);

module.exports = router;