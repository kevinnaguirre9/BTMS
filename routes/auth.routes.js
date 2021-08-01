const express = require('express');
const {logIn, logOut} = require('../controllers/auth.controller');
const {login} = require('../services/render');
const {authJwt} = require('../middlewares/index');

const router = express.Router();

/**
 * @description Render Login Route
 * @method GET /login
 */
router.get('/login', login); 

/**
 * @description LogIn Route
 * @method POST /login
 */
router.post('/login', logIn);

/**
 * @description LogOut Route
 * @method POST /logout
 */
 router.get('/logout', authJwt.verifyToken, logOut);


module.exports = {
     routes: router
}