const lg = require("../utils/authAndRoles");
const contactmessage = require("../models/contactmessage")
const pages = require("../models/page")

//TODO: validation and messaging
module.exports = function (app) {
    /*
    app.get('/dashboard/pages', function (req, res) {
        res.render('pages', { formData: "", message: "", response: "" });
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
    */
    app.get('/dashboard/pages'
        , lg.isLoggedIn
        , lg.haveRights
        , function (req, res) {
            pages.findAll().then(function (pages) {
                res.render('dashboard/pages', { user: req.user, pages: pages, messeges: "" });
            })
        });

    app.get('/dashboard/pages/add'
        , lg.isLoggedIn
        , lg.haveRights
        , function (req, res) {
            res.render('dashboard/pages-add', { user: req.user, messeges: "" });
        });
    
    app.post('/dashboard/pages/create'
        , lg.isLoggedIn
        , lg.haveRights
        , function (req, res) {
            pages.create(req.body).then(function(newPage){
                res.redirect('/dashboard/pages');
                console.log(newPage.id)
            })
        });
        

    app.get("/dashboard/pages/toggle/:id"
        , lg.isLoggedIn
        , lg.haveRights
        , function (req, res) {
            let id = req.params.id;
            pages.findById(id).then(function (pg) {
                pg.published = !pg.published;
                pg.save().then(function () {
                    res.redirect("/dashboard/pages")
                })

            })
        })

    app.get("/dashboard/pages/delete/:id"
        , lg.isLoggedIn
        , lg.haveRights
        , function (req, res) {
            let id = req.params.id;
            pages.findById(id).then(function (page) {
                page.destroy().then(function () {
                    res.redirect("/dashboard/pages")
                })
            })
        })

    app.get("/pages/:slug"
        , lg.isLoggedIn
        , lg.haveRights
        , function (req, res) {
            let slug = req.params.slug;
            pages.findOne({where:{slug:slug}}).then(function (pg) {
                res.render('page', { user: req.user, messeges: "" , page:pg });
            })
        })
    
    /*    
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
    */
}