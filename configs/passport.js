const bCrypt = require('bcrypt');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function (passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });


    // used to deserialize the user
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
            var data = {
                email: email,
                password: password,
                username: req.body.username,
                /*firstname: req.body.firstname,
                lastname: req.body.lastname */
            };

            User
                .create(data)
                .then(function (newUser, created) {
                    if (!newUser) {
                        return done(null, false);
                    }
                    if (newUser) {
                        return done(null, newUser);
                    }
                }).catch(function (err) {
                    console.log(err.message);
                    return done(null, false);
                });;
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
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }

            User.findOne({ [Op.or]: [{ email:email },{username: email}] }).then(function (user) {
                if (!user) {
                    return done(null, false, { message: 'Email does not exist' });
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, { message: 'Something went wrong' });
            });

        }
    ));


}


