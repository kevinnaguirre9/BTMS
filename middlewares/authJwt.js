const UserCredential = require('../models/UserCredentials');
const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyToken = async (req, res, next) => {
     const token = req.cookies.jwt;

     // check json web token and verify it
     if(!token) return res.redirect('/auth/login');  
     
     // if token exists, verify if the user with that token has credentials to log in to the system  
     var decoded;
     try {
		decoded = jwt.verify(token, config.SECRET);  
	} catch {
		return res.redirect('/auth/login'); // if invalid token, redirect to log in
	}
     
     // if valid token, check if the user exists
     const user = await UserCredential.findOne({userId: decoded.id}, {password: 0}).populate("userId");

     if(!user) return res.redirect('/auth/login');  // if user does not exists, redirect to login
     req.userId = user.userId._id;
     req.email = user.email;
     req.nombre = user.userId.nombres

     next();   // if everything ok, continue to next page
}

module.exports = {verifyToken};