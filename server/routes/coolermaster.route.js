const router = require('express').Router();

const { productRegister } = require('../controllers/coolermaster_controller');

router.route('/coolerMaster/productInformation')
    .post(productRegister)

module.exports = router;