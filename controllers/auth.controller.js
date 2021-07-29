const config = require('../config');
const UserCredential = require('../models/UserCredentials');
const jwt = require('jsonwebtoken');

const logIn = async (req, res) => {
     // Check if user exists
     const userCredentialsFound = await UserCredential.findOne({email: req.body.email});

     if (!userCredentialsFound) return res.status(400).render('login', {
          title: "BTM System", 
          email: req.body.email,
          password: req.body.password,
          message: 'Email inválido'});

     // check if the password sent match with the user password
     const matchPassword = await UserCredential.comparePassword(req.body.password, userCredentialsFound.password);

     if(!matchPassword) return res.status(400).render('login', {
          title: "BTM System", 
          email: req.body.email,
          password: req.body.password,
          message: 'Contraseña incorrecta'
     });
     
     const maxAge = 60 * 60 * 24;
     const token = jwt.sign({id: userCredentialsFound.userId}, config.SECRET, {
          expiresIn: maxAge // 24 hours valid token
     })

     res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000}); //one day valid token

     //console.log(userCredentialsFound);
     res.status(201).redirect('/user/home');
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