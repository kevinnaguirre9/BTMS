const User = require('../models/User');
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


const searchBtm = async (req, res) => {
     if(req.query.cedula) {
          const cedula = req.query.cedula;
          const user = await User.findOne({cedula: cedula});

          if (!user) return res.send({status: 'error', message: 'Usuario no encontrado'});

          return res.status(200).send({status: 'success', url: `/btm/measurements/${user._id}`}); 
     }
     
     res.render('search_user_btm', {title: "Buscar Mediciones"});
     
}


const getBodyTempMeasurementByUserId = async (req, res) => {
     const userId = req.params.userId;
     const userBodyTempMeasurements = await bodyTempMeasurement.find({userId: userId})
                                                                      .sort({ fechaMedicion: -1 })
                                                                      .limit(6);
     
     res.render('btm_by_user', {title: "Mediciones por usuario", userBodyTempMeasurements});
}


module.exports = {
     meausureBodyTemp,
     getBodyTempMeasurements,
     searchBtm,
     getBodyTempMeasurementByUserId
}
