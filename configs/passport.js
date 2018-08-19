const session = require("express-session")

module.exports = function (passport, user) {
    let User = user
    let LocalStrategy = require('passport-local').Strategy

    passport.serializeUser(function (user, done) {
        done(null, user.id)
    });


   passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            }
            else {
                done(user.errors, null);
            }
        });

    });


    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, email, password, done) {
            console.log("========================");
            var data = {
                email: email,
                password: password,
                username: req.body.username,
                /*firstname: req.body.firstname,
                lastname: req.body.lastname */
            };
            
            User.create(data)
                .then(function (newUser) {
                    if (!newUser) {
                        return done(null, data);
                    }
                    if (newUser) {
                        return done(null, newUser);
                    }
                }).catch(function (err) {
                    return done(null, false, req.flash('signupMessage', "Unexpected error"));
                });
        }
    ));


    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },

        function (req, email, password, done) {
            var User = user;

            //email,email -> becouse of same field with name email but handle also username
            User.usernaemOrEmail(email,email).then(function (user) {
                if (!user) {
                    return done(null, false, req.flash('siginMessageError', {"email":["incorrect username or email"]}));
                }
                if (user && !user.isValidPassword(password)) {
                    return done(null, false, req.flash('siginMessageError', {"password":["password incorrect"]}));
                }
                
                var userinfo = user.get();
                console.log("auth start--------------------");
                console.log(userinfo);
                console.log("auth end--------------------");
                return done(null, userinfo);

            }).catch(function (err) {
                console.log(err)
                return done(null, false, req.flash('siginMessageError', {"email":["something wrong"]}));
            });

        }
    ));


}


