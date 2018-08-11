const db = require("./configs/db");
const User = require("./models/user");

User.create({
    username: "jjjjjasdf",
    password: "asdf*ujHuy",
    email: "emoadf@dssdfdme444mai.com"
}).catch(function (err) {
    console.log("-----------------------------------------")
    //if(err instanceof SequelizeValidationError){
        console.log(err.message);
    //}
    
}).finally(function(){
    process.exit();
});





