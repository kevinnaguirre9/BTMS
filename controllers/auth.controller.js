const config = require('../config');
const UserCredential = require('../models/UserCredentials');
const jwt = require('jsonwebtoken');

const logIn = async (req, res) => {
     const data = req.body;
     // Check if user exists
     const userCredentialsFound = await UserCredential.findOne({email: data.email});

     if (!userCredentialsFound) return res.status(400).render('login', {
          title: "BTM System", 
          email: data.email,
          password: data.password,
          redirectTo: data.redirectTo,
          message: 'Email inválido'});

     // check if the password sent match with the user password
     const matchPassword = await UserCredential.comparePassword(data.password, userCredentialsFound.password);

     if(!matchPassword) return res.status(400).render('login', {
          title: "BTM System", 
          email: data.email,
          password: data.password,
          redirectTo: data.redirectTo,
          message: 'Contraseña incorrecta'
     });
     
     const maxAge = 60 * 60 * 8;
     const token = jwt.sign({id: userCredentialsFound.userId}, config.SECRET, {
          expiresIn: maxAge // 8 hours valid token
     })

     res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000}); //8 hours valid token

     res.status(201).redirect(data.redirectTo);
}

const logOut = async (req, res) => {
     res.cookie('jwt', '', {
          maxAge: 1, 
          domain:'localhost', 
          path: '/',
     });
     res.redirect('/auth/login');
}

module.exports = {
     logIn,
     logOut
};