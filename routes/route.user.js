let lg = require("../utils/authAndRoles");
let User = require("../models/user");

//TODO: validations and error reporting

module.exports = function (app, passport) {
    app.get('/dashboard/users'
        , lg.isLoggedIn
        , lg.haveRights
        , function (req, res) {
            User.findAll().then(function (users) {
                res.render('dashboard/users', { user: req.user, users: users, messeges:"" });
            })
        });

    app.get("/dashboard/users/:id"
        ,lg.isLoggedIn
        ,lg.haveRights
        ,function(req,res){
            let userid = req.params.id;
            if(userid){
               User.findOne({where:{
                   id:userid
               }}).then(function(userE){
                    res.render('dashboard/users-edit', { user: req.user, userE: userE});
               })
            }
    })
        
    app.post("/dashboard/users/update"
        ,lg.isLoggedIn
        ,lg.haveRights
        ,function(req,res){
            if(req.body.id){
                User.findById(req.body.id).then(function(user){
                    user.update(req.body).then(function(){
                        res.redirect("/dashboard/users/"+req.body.id);
                    }).catch(function(e){
                        res.redirect("/dashboard/users/"+req.body.id);
                    })
                })
            }
            else{
                res.redirect("/dashboard/users/"+req.body.id);
            }
        });

    app.get("/dashboard/users/delete/:id"
        , lg.isLoggedIn
        , lg.haveRights
        , function (req, res) {
            let userid = req.params.id;
            
            if(userid!==""){
                User.destroy({
                    where: {
                        id:userid
                    }
                }).then(function(){
                    res.redirect("/dashboard/users");
                })
            }
            
            //console.log(req.userinfo);
            //User.findAll().then(function (users) {
                //res.render('dashboard/users', { user: req.user, users: users });
            //})


        });

}

