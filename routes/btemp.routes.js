const express = require('express');
const {
     meausureBodyTemp, 
     getBodyTempMeasurements, 
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
router.get('/measurements', getBodyTempMeasurements); 

/**
 * @description Get user body temperature measurements
 * @method GET /
*/
router.get('/measurements/:userId', getBodyTempMeasurementByUserId); 


module.exports = {
     routes: router
}