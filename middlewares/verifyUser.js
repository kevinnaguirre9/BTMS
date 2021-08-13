const User = require('../models/User');
const UserCredential = require('../models/UserCredentials');
const fs = require('fs');

// Check if the CI and email are uniques
const checkDuplicatePublicData = async (req, res, next) => {
     const data = req.body;

     let cedulaExists;
     let phoneExists;

     if (data.id) {
          cedulaExists = await User.findOne( {_id: {$ne: data.id}, cedula: data.cedula} );
          phoneExists = await User.findOne( {_id: {$ne: data.id}, celular: data.celular} );
     } else {
          cedulaExists = await User.findOne( {cedula: data.cedula} );
          phoneExists = await User.findOne( {celular: data.celular} );
     }

     if(cedulaExists) {
          if(req.file) {
               fs.unlinkSync(req.file.path); // delete file from the server
          }
          return res.send({status: 'error', message: `Usuario con cédula ${data.cedula} ya registrado`});
     } else if(phoneExists) {
          if(req.file) {
               fs.unlinkSync(req.file.path); // delete file from the server
          }
          return res.send({status: 'error', message: `Usuario con celular ${data.celular} ya registrado`});
     }

     next();
}


const checkDuplicateEmail = async (req, res, next) => {
     const data = req.body;

     let emailExists = false;

     if(data.email) {
          emailExists = await UserCredential.findOne({email: data.email});
     } else if (data.emailToUpdate) {
          emailExists = await UserCredential.findOne( {_id: {$ne: data.id}, email: data.emailToUpdate} );
     }

     if(emailExists) {
          if(req.file) {
               fs.unlinkSync(req.file.path); // delete file from the server
          }
          return res.send({status: 'error', message: 'Email en uso'});
     }

     next();
}

module.exports = {
     checkDuplicatePublicData,
     checkDuplicateEmail
};