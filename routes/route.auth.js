let authController = require('../controllers/controller.auth');
let validation = require("../middlewares/user/validate.auth");

 module.exports = function(app, passport) {
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.post('/signup', 
            validation.signup.validateFileds, 
            validation.signup.uniqueData,
            passport.authenticate('local-signup', {
                successRedirect: '/dashboard',
                failureRedirect: '/signup',
                failureFlash: true 
        }
     ));
    app.get('/dashboard', isLoggedIn, authController.dashboard);
    app.get('/logout', authController.logout);
    
    app.post('/signin',validation.signin.validateFileds
         ,passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
            failureRedirect: '/signin'
        }
     ));
 
 
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }
 
}