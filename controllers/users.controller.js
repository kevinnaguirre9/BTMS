const User = require('../models/User');
const Role = require('../models/Role');
const UserCredential = require('../models/UserCredentials');
const {uploadFile, getFileStream, deleteFile} = require('../awsS3');
const fs = require('fs');

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

     fs.unlinkSync(file.path); // delete file from the server

     res.status(200).send({status: 'success', url:'/user/allUsers'});
}



const getUsers = async (req, res) => {
     const users = await User.find().sort({ createdAt: -1 }).limit(2);
     res.render('users', {title: 'Users', users})
}



const getUserById = async (req, res) => {
     const userId = req.params.userId;

     const user = await User.findById(userId);
     const roles = await Role.find();
     const userCredentials = await UserCredential.findOne({userId: userId});

     if(userCredentials) {
          return res.status(200).render('update_user', {
               title: 'Update user', 
               user,  
               roles,
               userCredentials
          });
     }  

     res.status(200).render('update_user', 
                         {title: 'Update user', 
                         user,  
                         roles});
     
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



const updateUserProfile = async (req, res) => {
     const data = req.body;
     console.log(data);

     const update = {
          nombres: data.nombres, 
          apellidos: data.apellidos,
          cedula: data.cedula,
          fechaNacimiento: new Date(data.fechaNacimiento),
          direccion: data.direccion,
          sexo: data.sexo,
          celular: data.celular,
          activo: data.estatus === 'true',
          rol: data.rol
     }
     const updatedProfile = await User.findByIdAndUpdate(req.params.userId, update, {
          new: true
     });
     console.log(updatedProfile);

     res.status(200).send({status: 'success', url:'/user/allUsers'}); 
     //podría ser 204 pero como quiero imprimir el nuevo registro lo dejo en 200
}


const updateUserAccount = async (req, res) => {
     
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

     res.status(200).send({status: 'success', url:'/user/allUsers'});
}

module.exports = {
     createUser,
     getUsers,
     getUserById,
     getUserImage,
     updateUserProfile,
     updateUserAccount,
     deleteUserById
}