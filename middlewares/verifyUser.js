const User = require('../models/User');
const UserCredential = require('../models/UserCredentials');

// Check if the CI and email are uniques
const checkDuplicateIdentityCard = async (req, res, next) => {
     const data = req.body;

     const cedulaExists = await User.findOne({cedula: data.cedula});

     if(cedulaExists) return res.status(400).json({message: `Usuario con cédula ${data.cedeula} ya registrado`});

     next();
}

const checkDuplicateEmail = async (req, res, next) => {
     const data = req.body;

     if(data.email) {
          const emailExists = await UserCredential.findOne({email: data.email});
          
          if(emailExists) return res.status(400).json({message: 'Email en uso'});
     }

     next();
}

module.exports = {
     checkDuplicateIdentityCard,
     checkDuplicateEmail
};