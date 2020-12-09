const router = require('express').Router();
const dashboard_controller = require('../controllers/dashboard_controller');
// const {wrapAsync} = require('../../util/util');

const {
    getDashboard,
    dashboard1,
    dashboard2
} = require('../controllers/dashboard_controller');

router.route('/admin/dashboard')
    .get(getDashboard);

router.route('/admin/dashboard1')
    .post(dashboard1)

router.route('/admin/dashboard2')
    .post(dashboard2)

module.exports = router;