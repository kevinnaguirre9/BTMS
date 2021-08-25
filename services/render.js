const Role = require('../models/Role');

exports.login = (req, res) => {
     let redirectTarget = '/user/home';

     if(req.query.return_to) {
          redirectTarget = req.query.return_to;
     }
     
     res.render('login', {title: "BTM System", redirectTo: redirectTarget});
     
}


// route for load the home (dashboard) page
exports.home =  (req, res) => {
     res.render('dashboard', {
          title: 'BTMS dashboard',
          welcome: 'Bienvenido, Admin',
          adminId: req.adminId,
          adminEmail: req.adminEmail
     });
}


// route for load the add user page
exports.create_user = async (req, res) => { 
     const roles = await Role.find();
     res.render('create_user', {
          title: "Register new user",
          roles,
          adminId: req.adminId,
          adminEmail: req.adminEmail
     });
}