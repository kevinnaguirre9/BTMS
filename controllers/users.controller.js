const User = require('../models/User');
const Role = require('../models/Role');
const UserCredential = require('../models/UserCredentials');
const {uploadFile} = require('../awsS3');
//const fs = require('fs');
//const path = require('path'); 

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
          imgUrl: '',
          activo: data.estatus === 'true',
          rol: data.rol
     });

     //Upload user photo to AWS S3
     const result = await uploadFile(file, newUser._id);
     console.log(result);

     newUser.imgUrl = result.Location;

     const userSaved = await newUser.save();

     // If email and password are sent to server, admin data is saved
     if(data.email && data.password) {
          const newUserCredentials = new UserCredential({
               email: data.email,
               password: await UserCredential.encryptPassword(data.password),
               userId: newUser._id
          });

          const userCredentialsSaved = await newUserCredentials.save();
          console.log(userCredentialsSaved);
     }

     console.log(userSaved);
     res.json('Creating user');
}



const getUsers = async (req, res) => {
     const users = await User.find().limit(10);
     res.json(users);
}



const getUserById = async (req, res) => {
     const user = await User.findById(req.params.userId);
     const roles = await Role.find();
     //console.log(new Date(user.fechaNacimiento).toLocaleDateString())
     res.status(200).render('update_user', 
                         {title: 'Update user', 
                         user,  
                         roles});
     
     //res.status(200).json(user);
}



const updateUserById = async (req, res) => {
     
}

const deleteUserById = async (req, res) => {
     
}

module.exports = {
     createUser,
     getUsers,
     getUserById,
     updateUserById,
     deleteUserById
}