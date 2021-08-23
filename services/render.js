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
          adminId: req.adminId,
          adminEmail: req.adminEmail
     });
}


// route for load the add user page
exports.create_user = (req, res) => { 
     res.render('create_user', {
          title: "Register new user",
          adminId: req.adminId,
          adminEmail: req.adminEmail
     });
}