const express = require('express');
const router = express.Router();
const {logIn, logOut} = require('../controllers/auth.controller')

/**
 * @description Render Login Route
 * @method GET /login
 */
router.get('/login', (req, res) => {
     res.render('login', {title: "BTM System"});
}); 

/**
 * @description Login Route
 * @method POST /login
 */
router.post('/login', logIn);

/**
 * @description Logout Route
 * @method POST /logout
 */
 router.get('/logout', logOut);


module.exports = {
     routes: router
}