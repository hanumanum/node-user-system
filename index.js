const env = process.env.NODE_ENV || "development";
const config = require('./configs/config.json')[env];
const identity = require("./i18n/identity/"+config.i18n).siteidentity;
const express = require('express');
const passport   = require('passport')
const session    = require('express-session')
const flash  = require('connect-flash');

const user = require("./models/user");
const contactmessage = require("./models/contactmessage");

const app = express();

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());

app.use(session(
        { secret: 'strange monkey'
            ,resave: true
            , saveUninitialized:true,
            cookie: { secure: false }
        }));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static('static'))
app.set('view engine', 'ejs');
app.locals = {identity:identity};


app.get('/', function(req, res) {
    res.render('home');
});

app.get('/contact', function(req, res) {
    res.render('contact', {formData:"", message:"", response:""});
});

app.post('/contact', function(req, res){
    if(req.body.email && req.body.contactmessage && req.body.email!="" && req.body.contactmessage!=""){
        let data = {
            email:req.body.email,
            topic:req.body.topic,
            text:req.body.contactmessage
        }
        contactmessage.create(data).then(function(){
            res.render('contact', {response:"Sucsessfuly sent, we will contact with you"});
        })
    }
    
});

app.get('/dashboard/users', function(req, res) {
    console.log(req.userinfo);
    res.render('dashboard/users',{user:req.user});
});

require('./routes/route.auth.js')(app,passport);
require('./configs/passport.js')(passport, user);


/*
app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
      console.log(r.route)
    }
})
*/

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