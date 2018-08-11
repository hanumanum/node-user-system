const env = process.env.NODE_ENV || "development";
const config = require('./configs/config.json')[env];
const identity = require("./i18n/identity/"+config.i18n).siteidentity;
const express = require('express');
const passport   = require('passport')
const session    = require('express-session')
const bodyParser = require('body-parser') 

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'strange monkey',resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('static'))

app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.render('home',{
        identity,
    });
});
 
app.get('/signup', function(req, res) {
    res.render('signup',{
        identity,
    });
});

app.get('/signin', function(req, res) {
    res.render('signin',{
        identity,
    });
});


app.get('*',function(req, res){
    res.status(404);
    if (req.accepts('html')) {
      res.render('404', { url: req.url, identity });
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