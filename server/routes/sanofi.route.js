const router = require('express').Router();

const { sanofiInformation, createQRCode} = require('../controllers/sanofi_controller');

router.route('/sanofi/productQRCode')
    .get(createQRCode)

module.exports = router;