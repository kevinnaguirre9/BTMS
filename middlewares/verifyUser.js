const User = require('../models/User');
const UserCredential = require('../models/UserCredentials');
const fs = require('fs');

// Check if the CI and email are uniques
const checkDuplicatePublicData = async (req, res, next) => {
     const data = req.body;

     const cedulaExists = await User.findOne({cedula: data.cedula});
     const phoneExists = await User.findOne({celular: data.celular});

     if(cedulaExists) {
          if(req.file) {
               fs.unlinkSync(req.file.path); // delete file from the server
          }
          return res.status(400).json({message: `Usuario con cédula ${data.cedula} ya registrado`});
     } else if(phoneExists) {
          if(req.file) {
               fs.unlinkSync(req.file.path); // delete file from the server
          }
          return res.status(400).json({message: `Usuario con celular ${data.celular} ya registrado`});
     }

     next();
}

const checkDuplicateEmail = async (req, res, next) => {
     if(req.body.email) {
          const emailExists = await UserCredential.findOne({email: req.body.email});
          
          if(emailExists) {
               if(req.file) {
                    fs.unlinkSync(req.file.path); // delete file from the server
               }
               return res.status(400).json({message: 'Email en uso'});
          }
     }

     next();
}

module.exports = {
     checkDuplicatePublicData,
     checkDuplicateEmail
};