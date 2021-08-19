const express = require('express');
const {authJwt} = require('../middlewares/index');
const {
     meausureBodyTemp, 
     getBodyTempMeasurements, 
     searchBtm,
     getBodyTempMeasurementByUserId
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


module.exports = {
     routes: router
}