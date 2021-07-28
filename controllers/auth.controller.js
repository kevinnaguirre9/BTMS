const config = require('../config');
const UserCredential = require('../models/UserCredentials');
const jwt = require('jsonwebtoken');

const logIn = async (req, res) => {
     // Check if user exists
     const userCredentialsFound = await UserCredential.findOne({email: req.body.email});

     if (!userCredentialsFound) return res.status(400).json({message: 'User not found'});

     // check if the password sent match with the user password
     const matchPassword = await UserCredential.comparePassword(req.body.password, userCredentialsFound.password);

     if(!matchPassword) return res.status(400).json({message: 'Invalid Password'});
 
     const token = jwt.sign({id: userCredentialsFound._id}, config.SECRET, {
          expiresIn: 86400 // 24 hours
     })

     console.log(userCredentialsFound);
     res.status(200).json({token});
}

module.exports = {
     logIn
};