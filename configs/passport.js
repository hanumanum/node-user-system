const bCrypt = require('bcrypt')
const Sequelize = require("sequelize")
const Op = Sequelize.Op
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
                .then(function (newUser, created) {
                    if (!newUser) {
                        return done(null, data);
                    }
                    if (newUser) {
                        //console.log("new users pass",newUser);
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
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, email, password, done) {
            var User = user;
            var isValidPassword = function (password, passwordHash) {
                return bCrypt.compareSync(password, passwordHash);
            }

            User.findOne({where: { [Op.or]: [{ email:email },{username: email}] }}).then(function (user) {
                if (!user) {
                    console.log("Email does not exist");
                    return done(null, false, { message: 'Email does not exist' });
                }
                if (!isValidPassword(password,user.password)) {
                    console.log("Incorrect password.");
                    return done(null, false, { message: 'Incorrect password.' });
                }
                console.log("correct user");
                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function (err) {
                console.log("Error:", err);
                console.log('Something went wrong');
                return done(null, false, { message: 'Something went wrong' });
            });

        }
    ));


}


