const lg = require("../utils/authAndRoles");
const contactmessage = require("../models/contactmessage")
const User = require("../models/user");


//TODO: validation and messaging
module.exports = function (app, passport) {
    app.get('/contact', function (req, res) {
        res.render('contact', { formData: "", message: "", response: "" });
    });

    app.post('/contact', function (req, res) {
        if (req.body.email && req.body.contactmessage && req.body.email != "" && req.body.contactmessage != "") {
            let data = {
                email: req.body.email,
                topic: req.body.topic,
                text: req.body.contactmessage
            }
            contactmessage.create(data).then(function () {
                res.render('contact', { response: "Sucsessfuly sent, we will reply you" });
            })
        }
    });

    app.get('/dashboard/contactmessages'
        , lg.isLoggedIn
        , lg.haveRights
        , function (req, res) {
            contactmessage.findAll().then(function (contactmessages) {
                res.render('dashboard/contactmessages', { user: req.user, contactmessages: contactmessages, messeges: "" });
            })
        });

    app.get("/dashboard/contactmessages/toggle/:id"
        , lg.isLoggedIn
        , lg.haveRights
        , function (req, res) {
            let id = req.params.id;
            contactmessage.findById(id).then(function (mess) {
                mess.readstatus = !mess.readstatus;
                mess.save().then(function () {
                    res.redirect("/dashboard/contactmessages")
                })

            })
        })

    app.get("/dashboard/contactmessages/delete/:id"
        , lg.isLoggedIn
        , lg.haveRights
        , function (req, res) {
            let id = req.params.id;
            contactmessage.findById(id).then(function (mess) {
                mess.destroy().then(function () {
                    res.redirect("/dashboard/contactmessages")
                })
            })
        })


    app.get("/api/unredmessages"
        , lg.isLoggedIn
        , lg.haveRights
        , function (req, res) {
            contactmessage.count({
                where: {
                    readstatus: false
                }
            }).then(function (data) {
                res.json(data);
            })
        })

}