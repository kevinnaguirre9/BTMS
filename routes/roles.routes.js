const express = require('express');
const {authJwt} = require('../middlewares/index');
const {createRole, getRoles, getRoleById, updateRoleById, deleteRoleById} = require('../controllers/roles.controller');

const router = express.Router();

/**
 * @description Create a new Role
 * @method POST /
*/
router.post('/', authJwt.verifyToken, createRole);  

/**
 * @description Get all Roles
 * @method GET /allRoles
*/
router.get('/', authJwt.verifyToken, getRoles);  

/**
 * @description Get Role by ID 
 * @method GET /:roleId
*/
router.get('/:roleId', authJwt.verifyToken, getRoleById);  

/**
 * @description Update user by ID route
 * @method PUT /:roleId
*/
router.put('/:roleId', authJwt.verifyToken, updateRoleById);  

/**
 * @description Delete user by ID route
 * @method DELETE /:roleId
*/
router.delete('/:roleId', authJwt.verifyToken, deleteRoleById);  


module.exports = {
     routes: router
}