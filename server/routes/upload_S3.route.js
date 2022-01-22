const router = require('express').Router();
const multer  = require('multer')
const storage = multer.diskStorage({ 
	destination: function (req, file, cb) {
		cb(null, 'public/uploads/')
	},
	filename: function (req, file, cb) {
			cb(null, Date.now() + "-" + file.originalname);
	}
});

const upload = multer({storage: storage});

const {
	uploadToS3,
} = require('../controllers/upload_s3_controller');

router.route('/admin/upload_S3')
	.post(upload.single('uploaded_file'), uploadToS3);

module.exports = router;