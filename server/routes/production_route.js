const router = require('express').Router();
// const {wrapAsync} = require('../../util/util');

const {
    // getGanttChart,
    getProductionData,
    fastCheckInOut
} = require('../controllers/production_controller');

router.route('/admin/getProductionData')
    .post(getProductionData);

router.route('/admin/fastCheckInOut')
    .post(fastCheckInOut);
// router.route('/admin/productionOrderInfo')
//     .post(productionOrderInfo);

module.exports = router;