exports.login = (req, res) => {
     res.render('login', {title: "BTM System"});    
}


// route for load the home (dashboard) page
exports.home =  (req, res) => {
     res.render('dashboard', {
          title: 'BTMS dashboard',
          user: req.email,
          userId: req.userId
     });
}


// route for load the add user page
exports.create_user = (req, res) => { 
     res.render('create_user', {title: "Register new user"});
}