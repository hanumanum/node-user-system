const contactmessage = require("../models/contactmessage")

module.exports = function(app){
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
                res.render('contact', {response:"Sucsessfuly sent, we will reply you"});
            })
        }
    });
    
}