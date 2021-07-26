const express = require('express');
const {createUser, getUsers, getUserById, updateUserById, deleteUserById} = require('../controllers/users.controller');

const router = express.Router();


/**
 * @description Create a new User Route
 * @method POST /
*/
router.post('/', createUser);  

/**
 * @description Get All Users Route
 * @method GET /allUsers
*/
router.get('/allUsers', getUsers);  

/**
 * @description Get user by ID route
 * @method GET /:userId
*/
router.get('/:userId', getUserById);  

/**
 * @description Update user by ID route
 * @method PUT /getUser/:id
*/
router.put('/:userId', updateUserById);  

/**
 * @description Delete user by ID route
 * @method DELETE /:userId
*/
router.delete('/:userId', deleteUserById);  


module.exports = {
     routes: router
}