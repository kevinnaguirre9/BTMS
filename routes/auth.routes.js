const express = require('express');
const router = express.Router();

/**
 * @description Login Route
 * @method GET /login
 */
router.get('/login', (req, res) => {
     res.render('login', {title: "BTM System"});
}); 


module.exports = {
     routes: router
}