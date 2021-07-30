'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
     PORT, 
     HOST,
     HOST_URL,
     MONGO_URI,
     JWT_SECRET,
     AWS_BUCKET_NAME,
     AWS_BUCKET_REGION,
     AWS_ACCESS_KEY,
     AWS_SECRET_KEY
} = process.env;

assert(PORT, 'Port is required');
assert(HOST, 'Host is required');

module.exports = {
     port: PORT,
     host: HOST,
     url: HOST_URL,
     mongoURI: MONGO_URI,
     SECRET: JWT_SECRET,
     AWS_BUCKET_NAME,
     AWS_BUCKET_REGION,
     AWS_ACCESS_KEY,
     AWS_SECRET_KEY
}