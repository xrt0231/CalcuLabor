const router = require('express').Router();
// const {wrapAsync} = require('../../util/util');

const {
    getStandard
} = require('../controllers/standard_controller');
const { getSchedule } = require('../models/schedule_model');

router.route('/admin/standard')
    .get(getStandard);

module.exports = router;