const User = require('../models/User');
const UserCredential = require('../models/UserCredentials');
//const fs = require('fs');
//const path = require('path'); 

const createUser = async (req, res) => {
     const data = req.body;
     
     const newUser = new User({
          nombres: data.nombres, 
          apellidos: data.apellidos,
          fechaNacimiento: new Date(data.fechaNacimiento),
          direccion: data.direccion,
          sexo: data.sexo,
          celular: data.celular,
          imgUrl: '',
          estatus: data.estatus,
          rol: data.rol
     });

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
     res.json('Get users');
}

const getUserById = async (req, res) => {
     
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