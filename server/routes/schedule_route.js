const router = require('express').Router();
// const {wrapAsync} = require('../../util/util');

const {
    getGanttChart,
    getActualGanttChart,
    productionOrderInfo,
    createProductionOrder,
    updateProductionOrder
} = require('../controllers/schedule_controller');

router.route('/admin/ganttchart')
    .post(getGanttChart);

router.route('/admin/ganttchartActual')
    .post(getActualGanttChart);

router.route('/admin/productionOrderInfo')
    .post(productionOrderInfo);
    
router.route('/admin/createProductionOrder')
    .post(createProductionOrder);

router.route('/admin/updateProductionOrder')
    .post(updateProductionOrder);

module.exports = router;
