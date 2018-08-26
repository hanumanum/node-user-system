const readline = require("readline");
//const User = require("./models/user");
const ContactMessage = require("./models/contactmessage");
const Pages = require("./models/page");


ContactMessage.sync({force: true}).then(function(){
    console.log("Contact Messages Table Created");
})

Pages.sync({force: true}).then(function(){
    console.log("Pages Table Created");
})




