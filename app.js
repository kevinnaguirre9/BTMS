'use strict';

const express = require('express');
const path = require('path'); 
const cors = require('cors');
const database = require('./database');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const bTempRoutes = require('./routes/btemp.routes');
const roleRoutes = require('./routes/roles.routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));    //parse request to express


//set view engine
app.set("view engine", "ejs")

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

app.get('/', (req, res) => {
     res.redirect('/auth/login');
});

//Auth routes
app.use('/auth', authRoutes.routes);
//User routes
app.use('/user', userRoutes.routes);
// BTMs routes
app.use('/btm', bTempRoutes.routes); 
// Role routes
app.use('/role', roleRoutes.routes); 


// Handle 404 not found error
app.use(function(req, res, next) {
     res.status(404).render('errors/404', {title: "Error 404"});
});


module.exports = app;

