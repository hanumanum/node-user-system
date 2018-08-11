const bCrypt = require('bcrypt');

module.exports = function(passport, user) {
    let User = user;
    let LocalStrategy = require('passport-local').Strategy;
    passport.use('local-signup', new LocalStrategy(
         {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
     
    ));

}