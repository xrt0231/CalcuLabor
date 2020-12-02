const router = require('express').Router();
// const {wrapAsync} = require('../../util/util');

const {
    getGanttChart,
    productionOrderInfo
} = require('../controllers/schedule_controller');

router.route('/admin/ganttchart')
    .post(getGanttChart);

router.route('/admin/productionOrderInfo')
    .post(productionOrderInfo);

module.exports = router;
