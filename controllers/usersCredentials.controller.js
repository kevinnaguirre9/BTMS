const UserCredential = require('../models/UserCredentials');

const updateEmail = async (req, res) => {
     const userId = req.params.userId;

     await UserCredential.findOneAndUpdate({userId: userId}, {
          email: req.body.emailToUpdate
     });
     
     // If the user email updated belong to the admin logged, then log out
     if(req.adminId == userId) return res.send({status: 'success', url:'/auth/logout'});

     res.send({status: 'success', url:'/user/allUsers'});
}

const updatePassword = async(req, res) => {
     const {oldPasswd, newPasswd, confPasswd} = req.body;
     const userId = req.params.userId;

     const userCredentialsFound = await UserCredential.findOne({userId: userId})

     const matchPassword = await UserCredential.comparePassword(oldPasswd, userCredentialsFound.password);

     if (!matchPassword) return res.send({status: 'error', message: 'Contraseña antigua incorrecta'}); 

     if (!(newPasswd === confPasswd)) return res.send({status:'error', message:'La nueva contraseña no coincide'}); 

     await UserCredential.findByIdAndUpdate(userCredentialsFound._id, {
          password: await UserCredential.encryptPassword(confPasswd)
     });
     
     // If the user password updated belong to the admin logged, then log out
     if(req.adminId == userId) return res.send({status: 'success', url:'/auth/logout'});

     res.send({status: 'success', url:'/user/allUsers'});
}


module.exports = {
     updateEmail,
     updatePassword
}