const User = require('../models/User');
const Role = require('../models/Role');
const UserCredential = require('../models/UserCredentials');
const bodyTempMeasurement = require('../models/BTemp');
const {uploadFile, getFileStream, deleteFile} = require('../awsS3');


const createUser = async (req, res) => {
     const data = req.body;
     const file = req.file;
     
     const newUser = new User({
          nombres: data.nombres, 
          apellidos: data.apellidos,
          cedula: data.cedula,
          fechaNacimiento: new Date(data.fechaNacimiento),
          direccion: data.direccion,
          sexo: data.sexo,
          celular: data.celular,
          imgKey: '',
          activo: data.estatus === 'true',
          rol: data.rol
     });

     //Upload user photo to AWS S3
     const result = await uploadFile(file, newUser._id);
     
     newUser.imgKey = result.key;

     await newUser.save();

     // If email and password are sent to server, admin data is saved
     if(data.email && data.password) {
          const newUserCredentials = new UserCredential({
               email: data.email,
               password: await UserCredential.encryptPassword(data.password),
               userId: newUser._id
          });

          await newUserCredentials.save();
     }

     res.status(200).send({status: 'success', url:'/user/allUsers'});
}


const getUsers = async (req, res) => {
     const users = await User.find().sort({ createdAt: -1 }).limit(5);
     res.render('users', {
          title: 'Users', 
          users,
          adminId: req.adminId,
          adminEmail: req.adminEmail
     })
}


const getUserById = async (req, res) => {
     const userId = req.params.userId;

     const user = await User.findById(userId);
     const roles = await Role.find();
     const userCredentials = await UserCredential.findOne({userId: userId});

     let logout = 'no-required';

     if(req.params.userId == req.adminId) {
          logout = 'required';
     }

     if(userCredentials) {
          return res.status(200).render('update_user', {
               title: 'Update user', 
               hasCredentials: true,
               logout,
               user,  
               roles,
               userCredentials,
               adminId: req.adminId,
               adminEmail: req.adminEmail
          });
     }  

     res.status(200).render('update_user', 
                         {title: 'Update user', 
                         user,  
                         roles,
                         adminId: req.adminId,
                         adminEmail: req.adminEmail
                    });
     
}


const getUserImage = async (req, res) => {
     const imgKey = req.params.imgKey;
     const readStream = getFileStream(imgKey);
     
     // catch errors
     readStream.on('error',(e) => {
          res.status(404).render('errors/404', {title: "Error 404"});
     });
     
     readStream.pipe(res);
}


const searchUser = async (req, res) => {
     if(req.query.cedula) {
          const cedula = req.query.cedula;
          const user = await User.findOne({cedula: cedula});

          if (!user) return res.send({status: 'error', message: 'Usuario no encontrado'});

          return res.status(200).send({status: 'success', url: `/user/${user._id}`}); 
     }
     
     res.render('search_user', {
          title: "Buscar usuario",
          adminId: req.adminId,
          adminEmail: req.adminEmail
     });
     
}


const updateUserProfile = async (req, res) => {
     const data = req.body;
     const file = req.file;
     const userId = req.params.userId;

     // if new image is send, update AWS S3 object
     let userImgKey = data.imgKey;

     if(file) {
          await deleteFile(data.imgKey);   // delete previous image
          const result = await uploadFile(file, userId); // upload new image
          userImgKey = result.key;
     }

     const update = {
          nombres: data.nombres, 
          apellidos: data.apellidos,
          cedula: data.cedula,
          fechaNacimiento: new Date(data.fechaNacimiento),
          direccion: data.direccion,
          sexo: data.sexo,
          celular: data.celular,
          imgKey: userImgKey,
          activo: data.estatus === 'true',
          rol: data.rol
     }
     
     // Update public info
     const userUpdated = await User.findByIdAndUpdate(userId, update);

     // If Administrators got the Basic role, then delete credentials
     if(data.hasCredentials === 'true' && data.rol !== userUpdated.rol) {
          await UserCredential.deleteOne({userId: userId});

          // If Admin whose role was updated to Basic role is logged in, then log out
          if(req.adminId == userId) return res.send({status: 'success', url:'/auth/logout'});
     }

     // If email and password are sent to server, admin data is saved
     if(data.email && data.password) {
          const newUserCredentials = new UserCredential({
               email: data.email,
               password: await UserCredential.encryptPassword(data.password),
               userId: userId
          });

          await newUserCredentials.save();
     }


     res.status(200).send({status: 'success', url:'/user/allUsers'}); 
}


const deleteUserById = async (req, res) => {
     const userId = req.params.userId;

     const userCredentials = await UserCredential.findOne({userId: userId});

     if(userCredentials) {    // delete credentials if user is an admin
          await UserCredential.deleteOne({userId: userId});
     }

     const userDeleted = await User.findByIdAndDelete(userId);   // delete user data
     
     // Delete user image from AWS S3
     await deleteFile(userDeleted.imgKey);

     // Delete body temperature measurements
     await bodyTempMeasurement.deleteMany({userId: userId});
     
     if(req.adminId == userId) return res.send({status: 'success', url:'/auth/logout'});

     res.status(200).send({status: 'success', url:'/user/allUsers'});
}

module.exports = {
     createUser,
     getUsers,
     getUserById,
     getUserImage,
     searchUser,
     updateUserProfile,
     deleteUserById
}