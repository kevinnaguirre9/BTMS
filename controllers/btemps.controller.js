const User = require('../models/User');
const bodyTempMeasurement = require('../models/BTemp');
const pdf = require('pdf-creator-node');
const fs = require('fs');
const path = require('path');
const options = require('../helpers/options');


const meausureBodyTemp = async (req, res) => {
     const data = req.body;

     const newMeasurement = new bodyTempMeasurement({
          celsius: data.celsius,
          userId: data.userId
     })

     const measurementSaved = await newMeasurement.save();
     res.send(measurementSaved);
}


const getBodyTempMeasurements = async (req, res) => {
     const measurements = await bodyTempMeasurement.find().populate('userId').sort({ fechaMedicion: -1 }).limit(5);
     res.render('bTempMsmt', {
          title: 'Mediciones', 
          measurements,
          adminId: req.adminId,
          adminEmail: req.adminEmail
     });
}


const searchBtm = async (req, res) => {
     if(req.query.cedula) {
          const cedula = req.query.cedula;
          const user = await User.findOne({cedula: cedula});

          if (!user) return res.send({status: 'error', message: 'Usuario no encontrado'});

          return res.status(200).send({status: 'success', url: `/btm/measurements/${user._id}`}); 
     }
     
     res.render('search_user_btm', {
          title: "Buscar Mediciones",
          adminId: req.adminId,
          adminEmail: req.adminEmail
     });
     
}


const getBodyTempMeasurementByUserId = async (req, res) => {
     const userId = req.params.userId;
     const userBodyTempMeasurements = await bodyTempMeasurement.find({userId: userId})
                                                                      .sort({ fechaMedicion: -1 })
                                                                      .limit(6);
     
     res.render('btm_by_user', {
          title: "Mediciones por usuario", 
          userId, 
          userBodyTempMeasurements,
          adminId: req.adminId,
          adminEmail: req.adminEmail
     });
}


const generateBtmReportByUser = async (req, res) => {
     const userId = req.params.userId;
     const userData = await User.findById(userId).lean();
     const userBtm = await bodyTempMeasurement.find({userId: userId}).sort({ fechaMedicion: -1 }).lean()

     const html = fs.readFileSync(path.join(__dirname, '../views/user_btm_template.html'), 'utf-8');
     const filename = `${userId}.pdf`

     const obj = {
          user: userData,
          measurements: userBtm,
          date: new Date().toLocaleDateString('ec-Ec')
     }

     const document = {
          html: html,
          data: {
              bodyTempMeasurements: obj
          },
          path: './docs/' + filename
     }

     const pdfCreated = await pdf.create(document, options);
     
     res.download(pdfCreated.filename, (err) => {
          if(err) {
               console.log('there was error in res.downoad!', err)
          }
          fs.unlinkSync(pdfCreated.filename)
     })
}


module.exports = {
     meausureBodyTemp,
     getBodyTempMeasurements,
     searchBtm,
     getBodyTempMeasurementByUserId,
     generateBtmReportByUser
}
