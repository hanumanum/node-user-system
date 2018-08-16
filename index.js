const env = process.env.NODE_ENV || "development";
const config = require('./configs/config.json')[env];
const identity = require("./i18n/identity/"+config.i18n).siteidentity;
const express = require('express');
const passport   = require('passport')
const session    = require('express-session')
const flash  = require('connect-flash');


const user = require("./models/user");

const app = express();

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(session(
        { secret: 'strange monkey'
            ,resave: true
            , saveUninitialized:true,
            cookie: { secure: false }
        }));

app.use(express.static('static'))
app.set('view engine', 'ejs');
app.locals = {identity:identity}; //TODO clearify ???


app.use(function(req, res, next) {
    res.locals.error = req.session.error || '';
    res.locals.message = req.session.message || '';
    delete req.session.error;
    delete req.session.message;
    next();
 });

//app.use(flash());


app.get('/', function(req, res) {
    res.render('home');
});


var authRoute = require('./routes/auth.js')(app,passport);
require('./configs/passport.js')(passport, user);


app.get('*',function(req, res){
    res.status(404);
    if (req.accepts('html')) {
      res.render('404', { url: req.url});
      return;
    }
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }
});

app.listen(5000, function(err) {
    if (!err)
        console.log("Site is live, port 5000");
    else console.log(err)
});