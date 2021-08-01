const express = require('express');
const multer = require('multer');
const {verifyToken} = require('../middlewares/authJwt');
const {createUser, getUsers, getUserById, getUserImage, updateUserProfile, updateUserAccount, deleteUserById} = require('../controllers/users.controller');
const { json } = require('express');

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
router.get('/create-user', verifyToken, (req, res) => {
     res.render('create_user', {title: "Register new user"});
}); 

/**
 * @description Get user dashboard
 * @method GET /dashboard
*/
router.get('/home', verifyToken, (req, res) => {
     res.render('dashboard', {
          title: 'BTMS dashboard',
          user: req.email,
          userId: req.userId
     });
}); 


/**
 * @description Create a new User Route
 * @method POST /
*/
router.post('/createUser', upload.single('user_photo'), createUser);

/**
 * @description Get All Users Route
 * @method GET /allUsers
*/
router.get('/allUsers', getUsers);  

/**
 * @description Get user by ID route
 * @method GET /:userId
*/
router.get('/:userId', verifyToken, getUserById);  

/**
 * @description Get user photo route
 * @method GET /:userId
*/
router.get('/images/:imgKey', verifyToken, getUserImage); 

/**
 * @description Update user profile route
 * @method PUT /getUser/:id
*/
router.put('/profile/:userId', updateUserProfile);  

/**
 * @description Update user account route
 * @method PUT /getUser/:id
*/
router.put('/account/:userId', updateUserAccount);  

/**
 * @description Delete user by ID route
 * @method DELETE /:userId
*/
router.delete('/:userId', deleteUserById);  


module.exports = {
     routes: router
}