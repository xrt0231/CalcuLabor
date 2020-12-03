const router = require('express').Router();
// const {wrapAsync} = require('../../util/util');

const {
    // getGanttChart,
    getProductionData,
    updateProductionData
} = require('../controllers/production_controller');

router.route('/admin/getProductionData')
    .post(getProductionData);

router.route('/admin/updateProductionData')
    .post(updateProductionData);
// router.route('/admin/productionOrderInfo')
//     .post(productionOrderInfo);

module.exports = router;