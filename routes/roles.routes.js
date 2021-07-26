const express = require('express');
const {createRole, getRoles, getRoleById, updateRoleById, deleteRoleById} = require('../controllers/roles.controller');

const router = express.Router();


/**
 * @description Create a new Role
 * @method POST /
*/
router.post('/', createRole);  

/**
 * @description Get all Roles
 * @method GET /allRoles
*/
router.get('/allRoles', getRoles);  

/**
 * @description Get Role by ID 
 * @method GET /:roleId
*/
router.get('/:roleId', getRoleById);  

/**
 * @description Update user by ID route
 * @method PUT /:roleId
*/
router.put('/:roleId', updateRoleById);  

/**
 * @description Delete user by ID route
 * @method DELETE /:roleId
*/
router.delete('/:roleId', deleteRoleById);  


module.exports = {
     routes: router
}