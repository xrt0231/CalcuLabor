const router = require('express').Router();
// const {wrapAsync} = require('../../util/util');

const {
	getGanttChart,
	getActualGanttChart,
	productionOrderInfo,
	createProductionOrder,
	updateProductionOrder,
	dropdownProcess,
	dropdownProducionOrderNum,
	dropdownPartNum

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

router.route('/admin/dropdownProcess')
	.get(dropdownProcess);

router.route('/admin/dropdownProductionOrderNum')
	.post(dropdownProducionOrderNum);

router.route('/admin/dropdownPartNum')
	.post(dropdownPartNum);

module.exports = router;
