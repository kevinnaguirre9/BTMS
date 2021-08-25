const UserCredential = require('../models/UserCredentials');
const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyToken = async (req, res, next) => {
     const token = req.cookies.jwt;
     const redirectTarget = encodeURIComponent(req.originalUrl);

     // check json web token and verify it
     if(!token) return res.redirect(`/auth/login?return_to=${redirectTarget}`);
     
     // if token exists, verify if the user with that token has credentials to log in to the system  
     var decoded;
     try {
		decoded = jwt.verify(token, config.SECRET);  
	} catch {
		return res.redirect(`/auth/login?return_to=${redirectTarget}`); // if invalid token, redirect to log in
	}
     
     // if valid token, check if the user exists
     const user = await UserCredential.findOne({userId: decoded.id}, {password: 0});

     // if user does not exist, redirect to login
     if(!user) return res.redirect(`/auth/login?return_to=${redirectTarget}`);

     req.adminId = user.userId;
     req.adminEmail = user.email;

     next();   // if everything ok, continue to next page
}

const isLoggedOut = async (req, res, next) => {
     const token = req.cookies.jwt;

     // check json web token and verify it
     if(!token) return next();
     
     // if token exists, verify if the user with that token has credentials to log in to the system  
     var decoded;
     try {
		decoded = jwt.verify(token, config.SECRET);  
	} catch {
		return next(); // if invalid token, go to log in
	}
     
     // if valid token, check if the user exists
     const user = await UserCredential.findOne({userId: decoded.id}, {password: 0});

     // if user does not exist, go to to login
     if(!user) return next();

     // if user is logged in, and return-to uri exists, redirect to return-to uri
     if(req.query.return_to) return res.redirect(req.query.return_to);

     res.redirect('/user/home');   // Otherwise redirect to /home
}

module.exports = {
     verifyToken,
     isLoggedOut
};