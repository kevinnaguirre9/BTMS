const express = require('express');
const multer = require('multer');
const {home, create_user} = require('../services/render');
const {authJwt, verifyUser} = require('../middlewares/index');
const {createUser, getUsers, getUserById, getUserImage, updateUserProfile, updateUserAccount, deleteUserById} = require('../controllers/users.controller');

const router = express.Router();

var storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, 'uploads/')
     },
     filename: function (req, file, cb) {
       cb(null, file.originalname)
     }
});
   
const fileFilter = (req, file, cb) => {
     if(!file.mimetype.startsWith('image')) {
          return cb(JSON.stringify({
               success: false,
               message: 'Invalid file type. Only jpg, png image files are allowed.'
           }), false);  // reject a file if it's not an image
     }
     cb(null, true);
};
    
var upload = multer({
     storage: storage, 
     limits: {
          fileSize: 1025 * 1025 * 3     // no more than 3 mb file
     },
     fileFilter: fileFilter
});

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
     verifyUser.checkDuplicateEmail
], upload.single('user_photo'), createUser);

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
     verifyUser.checkDuplicateEmail
], upload.single('user_photo'), updateUserProfile);  

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