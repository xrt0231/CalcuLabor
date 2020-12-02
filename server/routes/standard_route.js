const router = require('express').Router();
// const {wrapAsync} = require('../../util/util');

const {
    getStandard
} = require('../controllers/standard_controller');


router.route('/admin/standard')
    .get(getStandard);

module.exports = router;