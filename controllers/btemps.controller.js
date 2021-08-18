const bodyTempMeasurement = require('../models/BTemp');

const meausureBodyTemp = async (req, res) => {
     const data = req.body;

     const newMeasurement = new bodyTempMeasurement({
          fahrenheit: data.fahrenheit,
          userId: data.userId
     })

     const measurementSaved = await newMeasurement.save();
     res.send(measurementSaved);
}

const getBodyTempMeasurements = async (req, res) => {
     const measurements = await bodyTempMeasurement.find().populate('userId').sort({ fechaMedicion: -1 }).limit(5);
     res.render('bTempMsmt', {title: 'Mediciones', measurements});
}

const getBodyTempMeasurementByUserId = async (req, res) => {
     const userId = req.params.userId;
     const userBodyTempMeasurements = await bodyTempMeasurement.find({userId: userId})
                                                                      .sort({ fechaMedicion: -1 })
                                                                      .limit(10);
     res.send(userBodyTempMeasurements);
}

module.exports = {
     meausureBodyTemp,
     getBodyTempMeasurements,
     getBodyTempMeasurementByUserId
}
