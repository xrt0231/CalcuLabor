const router = require('express').Router();
// const {wrapAsync} = require('../../util/util');

const {
    getGanttChart,
    productionOrderInfo,
    createProductionOrder
} = require('../controllers/schedule_controller');

router.route('/admin/ganttchart')
    .post(getGanttChart);

router.route('/admin/productionOrderInfo')
    .post(productionOrderInfo);
    
router.route('/admin/createProductionOrder')
    .post(createProductionOrder);

module.exports = router;
