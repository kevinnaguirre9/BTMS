const UserCredential = require('../models/UserCredentials');

const updateEmail = async (req, res) => {
     await UserCredential.findOneAndUpdate({userId: req.params.userId}, {
          email: req.body.emailToUpdate
     });

     //Implement: if email/password updated are the same of current sesion, redirect to /user/logout
     //else continue logged
     // we could use express-session to achieve this
     res.status(200).send({status: 'success', url:'/user/allUsers'});
}

const updatePassword = async(req, res) => {
     const {oldPasswd, newPasswd, confPasswd} = req.body;
     const userId = req.params.userId;

     const userCredentialsFound = await UserCredential.findOne({userId: userId})

     const matchPassword = await UserCredential.comparePassword(oldPasswd, userCredentialsFound.password);

     if (!matchPassword) return res.send({status: 'error', message: 'Contraseña antigua incorrecta'}); 

     if (! (newPasswd === confPasswd)) return res.send({status: 'error', message: 'La nueva contraseña no coincide'}); 

     await UserCredential.findByIdAndUpdate(userCredentialsFound._id, {
          password: await UserCredential.encryptPassword(confPasswd)
     });

     //Implement: if email/password updated are the same of current sesion, redirect to /user/logout
     //else continue logged
     // we could use express-session to achieve this
     res.status(200).send({status: 'success', url:'/user/allUsers'});
}


module.exports = {
     updateEmail,
     updatePassword
}