const config = require('./config');
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = config.AWS_BUCKET_NAME;
const region = config.AWS_BUCKET_REGION;
const accessKeyId = config.AWS_ACCESS_KEY;
const secretAccessKey = config.AWS_SECRET_KEY;

const s3 = new S3({
     region,
     accessKeyId,
     secretAccessKey
})


//uploads a file to S3
function uploadFile(file, file_name) {
     const fileStream = fs.createReadStream(file.path);

     //get file extension and file name
     let file_ext = file.originalname.split('.');
     file_ext = `.${file_ext[file_ext.length-1]}`;     

     const fname = `${file_name.toString()}${file_ext}`;

     const uploadParams = {
          Bucket: bucketName,
          Body: fileStream,
          Key: fname
     };

     fs.unlinkSync(file.path); // delete file from the server
     
     return s3.upload(uploadParams).promise()
}

exports.uploadFile = uploadFile;


//download a file from S3