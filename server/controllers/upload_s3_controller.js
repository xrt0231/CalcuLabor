require('dotenv').config();
require('fs');

const S3 = require('aws-sdk/clients/s3')
const fs = require('fs');
const bucketname = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey= process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

// async function uploadFile(file){
//     const fileStream = fs.createReadStream(file.path);
//     const uploadParams = {
//         Bucket: bucketname,
//         Body: fileStream,
//         Key: file.filename,
//     };

//     return s3.upload(uploadParams).promise();
// }

//upload file to public/uploads
const uploadToS3 = async (req, res) => {
    // let newPath = `public/uploads/${req.file.originalname}`
    // fs.rename(req.file.path, newPath, () => {
	// res.json({result: 'upload successful'});
    // });

    //upload file to AWS S3
    const result = await uploadFile(req.file);

    async function uploadFile(file){
        const fileStream = fs.createReadStream(file.path);
        const uploadParams = {
            Bucket: bucketname,
            Body: fileStream,
            Key: file.filename,
        };
    
        s3.upload(uploadParams).promise();
    }
    
    res.send({
        status: 'success',
        message: 'File uploaded successfully',
        data: req.file,
    });
}

module.exports = { uploadToS3 };