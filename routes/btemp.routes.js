const express = require('express');
const {authJwt} = require('../middlewares/index');
const {
     meausureBodyTemp, 
     getBodyTempMeasurements, 
     searchBtm,
     getBodyTempMeasurementByUserId,
     generateBtmReportByUser
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
 * @description Get user body temperature measurements report
 * @method GET /
*/
router.get('/measurements/report/:userId', authJwt.verifyToken, generateBtmReportByUser); 


module.exports = {
     routes: router
}