let authController = require('../controllers/controller.auth');
let validation = require("../middlewares/user/validate.auth");
let lg = require("../utils/authAndRoles");

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
    app.get('/dashboard', lg.isLoggedIn, authController.dashboard);
    app.get('/logout', authController.logout);
    
    app.post('/signin',validation.signin.validateFileds
         ,passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
            failureRedirect: '/signin'
        }
     ));
 
 
 
}