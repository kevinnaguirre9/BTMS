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
     const userData = await User.findById(userId, {nombres: 1, apellidos: 1});
     const userBodyTempMeasurements = await bodyTempMeasurement.find({userId: userId})
                                                                      .sort({ fechaMedicion: -1 })
                                                                      .limit(6);
     
     res.render('btm_by_user', {
          title: "Mediciones por usuario", 
          userData, 
          userBodyTempMeasurements,
          adminId: req.adminId,
          adminEmail: req.adminEmail
     });
}


const generateBtmReport = async (req, res) => {
     const {startDate, endDate, regenerate} = req.query;

     const btm = await bodyTempMeasurement.find({
          fechaMedicion: {
               $gte: `${startDate}T00:00:00`,
               $lte: `${endDate}T23:59:59`
          }
     }).lean();

     const html = fs.readFileSync(path.join(__dirname, '../views/btm_template.html'), 'utf-8');
     const filename = 'BTMreport';

     btm.forEach(data => {
          data.horaMedicion = data.fechaMedicion.toLocaleString('ec-Ec').slice(10, 15);
          data.fechaMedicion = data.fechaMedicion.toLocaleString('ec-Ec').slice(0, 9);
     });

     const obj = {
          measurements: btm,
          date: new Date().toLocaleDateString('ec-Ec')
     }

     const document = {
          html: html,
          data: {
              bodyTempMeasurements: obj
          },
          path: `./docs/${filename}.pdf`
     }

     //Create pdf report
     await pdf.create(document, options);

     const downloadUrl = `/btm/measurements/report/download?filename=${filename}&startDate=${startDate}&endDate=${endDate}`;

     if(regenerate) return res.redirect(downloadUrl);

     res.send({status: 'success', url: downloadUrl});
}


const generateBtmReportByUser = async (req, res) => {
     const userId = req.params.userId;
     const userData = await User.findById(userId, {nombres: 1, apellidos: 1}).lean();
     const userBtm = await bodyTempMeasurement.find({userId: userId}).sort({ fechaMedicion: -1 }).lean()

     const html = fs.readFileSync(path.join(__dirname, '../views/btm_template.html'), 'utf-8');
     const filename = userId;

     userBtm.forEach(data => {
          data.horaMedicion = data.fechaMedicion.toLocaleString('ec-Ec').slice(10, 15);
          data.fechaMedicion = data.fechaMedicion.toLocaleString('ec-Ec').slice(0, 9);
     });

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
          path: `./docs/${filename}.pdf`
     }

     //Create pdf report
     await pdf.create(document, options);

     const downloadUrl = `/btm/measurements/report/download?filename=${filename}&userId=${userId}`;

     if(req.query.regenerate) return res.redirect(downloadUrl);

     res.send({status: 'success', url: downloadUrl});
}


const downloadBtmReport = async (req, res) => {
     const {filename, userId, startDate, endDate} = req.query;
     const pdfPath = `docs/${filename}.pdf`;

     //If file doesn't exist anymore, regenerate the report
     if(!fs.existsSync(pdfPath)) {
          //Case 1: General report
          let regenerateUrl=`/btm/measurements/report/all?startDate=${startDate}&endDate=${endDate}&regenerate=true`;
          //Case 2: Report by user
          if(userId) {
               regenerateUrl = `/btm/measurements/${userId}/report?regenerate=true`;
          }
          return res.redirect(regenerateUrl);
     }

     res.download(pdfPath, (err) => {
          if(err) {
               console.log('there was error in res.download!', err)
          }
          fs.unlinkSync(pdfPath);  //delete file
     })
}


module.exports = {
     meausureBodyTemp,
     getBodyTempMeasurements,
     searchBtm,
     getBodyTempMeasurementByUserId,
     generateBtmReport,
     generateBtmReportByUser,
     downloadBtmReport
}
