const express = require('express');
const {home, create_user} = require('../services/render');
const {authJwt, verifyUser, multerUpload} = require('../middlewares/index');
const {
     createUser, 
     getUsers, 
     getUserById, 
     getUserImage, 
     searchUser, 
     updateUserProfile, 
     updateUserAccount, 
     deleteUserById
} = require('../controllers/users.controller');
const {updateEmail, updatePassword} = require('../controllers/usersCredentials.controller')

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
 * @description Get search user form
 * @method GET /search-user
*/
router.get('/search', authJwt.verifyToken, searchUser); 


/**
 * @description Create a new User Route
 * @method POST /
*/
router.post('/createUser', [
     authJwt.verifyToken, 
     multerUpload.imgUpload,
     verifyUser.checkDuplicatePublicData,
     verifyUser.checkDuplicateEmail,
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
     multerUpload.imgUpload,
     verifyUser.checkDuplicatePublicData,
     verifyUser.checkDuplicateEmail
], updateUserProfile);  

/**
 * @description Update user email route
 * @method PUT /getUser/:id
*/
router.put('/account/:userId', [
     authJwt.verifyToken, 
     verifyUser.checkDuplicateEmail
], updateEmail);  

/**
 * @description Update user password route
 * @method PUT /getUser/:id
*/
router.put('/security/:userId', [
     authJwt.verifyToken, 
], updatePassword); 

/**
 * @description Delete user by ID route
 * @method DELETE /:userId
*/
router.delete('/:userId', authJwt.verifyToken, deleteUserById);  


module.exports = {
     routes: router
}