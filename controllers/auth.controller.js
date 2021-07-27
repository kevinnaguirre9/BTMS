const UserCredential = require('../models/UserCredentials');
const Role = require('../models/Role');

const logIn = async (req, res) => {
     // Check if user exists
     const userCredentialsFound = await UserCredential.findOne({email: req.body.email});

     if (!userCredentialsFound) return res.status(400).json({message: 'User not found'});

     // check if the password sent match with the user password
     const matchPassword = await UserCredential.comparePassword(req.body.password, userCredentialsFound.password);

     if(!matchPassword) return res.status(400).json({message: 'Invalid Password'});

     console.log(userCredentialsFound);
     res.json({token: 'new.token'});
}

module.exports = {
     logIn
};