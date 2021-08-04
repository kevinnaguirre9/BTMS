const config = require('./config');
const fs = require('fs');
const path = require('path');
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
     const ext = path.extname(file.originalname).toLowerCase();   

     const fileKey = `${file_name.toString()}${ext}`;

     const uploadParams = {
          Bucket: bucketName,
          Body: fileStream,
          Key: fileKey
     };
     
     return s3.upload(uploadParams).promise()
}

exports.uploadFile = uploadFile;


//download a file from S3

function getFileStream(fileKey) {
     const downloadParams = {
          Key: fileKey,
          Bucket: bucketName
     }

     return s3.getObject(downloadParams).createReadStream();
}

exports.getFileStream = getFileStream;


//delete a file from S3

function deleteFile(fileKey) {
     const deleteParams = {
          Key: fileKey,
          Bucket: bucketName
     }

     return s3.deleteObject(deleteParams).promise();
}

exports.deleteFile = deleteFile;