const express = require('express');
const {authJwt} = require('../middlewares/index');
const {
     meausureBodyTemp, 
     getBodyTempMeasurements, 
     searchBtm,
     getBodyTempMeasurementByUserId,
     generateBtmReport,
     generateBtmReportByUser,
     downloadBtmReport
} = require('../controllers/btemps.controller')

const router = express.Router();

/**
 * @description Create a new body temperature measure
 * @method POST /
*/
router.post('/', meausureBodyTemp); 

/**
 * @description Get body temperature measurements
 * @method GET /
*/
router.get('/search', authJwt.verifyToken, searchBtm); 

/**
 * @description Get body temperature measurements
 * @method GET /
*/
router.get('/measurements', authJwt.verifyToken, getBodyTempMeasurements); 

/**
 * @description Get user body temperature measurements
 * @method GET /
*/
router.get('/measurements/:userId', authJwt.verifyToken, getBodyTempMeasurementByUserId); 

/**
 * @description Generate body temperature measurements report
 * @method GET /
*/
router.get('/measurements/report/all', authJwt.verifyToken, generateBtmReport); 

/**
 * @description Generate body temperature measurements report by user
 * @method GET /
*/
router.get('/measurements/:userId/report', authJwt.verifyToken, generateBtmReportByUser); 

/**
 * @description Download body temperature measurements report
 * @method GET /
*/
router.get('/measurements/report/download', authJwt.verifyToken, downloadBtmReport);


module.exports = {
     routes: router
}