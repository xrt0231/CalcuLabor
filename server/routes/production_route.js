const router = require('express').Router();
// const {wrapAsync} = require('../../util/util');

const {
    // getGanttChart,
    getProductionData
} = require('../controllers/production_controller');

router.route('/admin/getProductionData')
    .post(getProductionData);

// router.route('/admin/productionOrderInfo')
//     .post(productionOrderInfo);

module.exports = router;