const lg = require("../utils/authAndRoles");
const contactmessage = require("../models/contactmessage")
const validation = require("../middlewares/contactmessage/validate.contactmessage")

module.exports = function (app) {
    app.get('/contact', function (req, res) {
        res.render('contact', { valid: null, validation: "", formData: "" });
    });

    app.post('/contact', validation.validateFileds, function (req, res) {
        let data = {
            email: req.body.email,
            topic: req.body.topic,
            text: req.body.contactmessage
        }
        contactmessage.create(data).then(function () {
            res.render('contact', { valid:true});
        })
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