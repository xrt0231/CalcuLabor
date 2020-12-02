const router = require('express').Router();
// const {wrapAsync} = require('../../util/util');

const {
    getDashboard
} = require('../controllers/dashboard_controller');

router.route('/admin/dashboard')
    .get(getDashboard);

module.exports = router;