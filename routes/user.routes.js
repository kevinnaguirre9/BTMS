const express = require('express');
const {home, create_user} = require('../services/render');
const {authJwt, verifyUser, multerUpload} = require('../middlewares/index');
const {createUser, getUsers, getUserById, getUserImage, updateUserProfile, updateUserAccount, deleteUserById} = require('../controllers/users.controller');

const router = express.Router();

/**
 * @description Get Users form
 * @method GET /allUsers
*/
router.get('/create-user', authJwt.verifyToken, create_user); 

/**
 * @description Get user dashboard home
 * @method GET /dashboard
*/
router.get('/home', authJwt.verifyToken, home); 


/**
 * @description Create a new User Route
 * @method POST /
*/
router.post('/createUser', [
     authJwt.verifyToken, 
     verifyUser.checkDuplicateIdentityCard,
     verifyUser.checkDuplicateEmail,
     multerUpload.imgUpload
], createUser);

/**
 * @description Get All Users Route
 * @method GET /allUsers
*/
router.get('/allUsers', authJwt.verifyToken, getUsers);  

/**
 * @description Get user by ID route
 * @method GET /:userId
*/
router.get('/:userId', authJwt.verifyToken, getUserById);  

/**
 * @description Get user photo route
 * @method GET /:userId
*/
router.get('/images/:imgKey', authJwt.verifyToken, getUserImage); 

/**
 * @description Update user profile route
 * @method PUT /getUser/:id
*/
router.put('/profile/:userId', [
     authJwt.verifyToken, 
     verifyUser.checkDuplicateIdentityCard,
     verifyUser.checkDuplicateEmail,
     multerUpload.imgUpload
], updateUserProfile);  

/**
 * @description Update user account route
 * @method PUT /getUser/:id
*/
router.put('/account/:userId', [
     authJwt.verifyToken, 
     verifyUser.checkDuplicateEmail
], updateUserAccount);  

/**
 * @description Delete user by ID route
 * @method DELETE /:userId
*/
router.delete('/:userId', authJwt.verifyToken, deleteUserById);  


module.exports = {
     routes: router
}