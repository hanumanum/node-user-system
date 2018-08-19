const db = require("./configs/db");
const User = require("./models/user");
const bycript = require("bcrypt");

const pass = "123458";
const pass2 = "1234"
var hashed = //bycript.hashSync(pass,10);

bycript.hash(pass,10,function(err,hash){
    hashed = hash;
    console.log(hashed);

    bycript.compare(pass,hashed, function(err,same){
        console.log("compare",same);
    })
})



/*
console.log(hashed);
console.log("$2b$08$RySt7CQNa5sDdZisCv9ST.NZ.65AJrn2vzWa.IBOpg0YliQJ5kBnS");
*/

// $2b$08$RySt7CQNa5sDdZisCv9ST.NZ.65AJrn2vzWa.IBOpg0YliQJ5kBnS
// $2b$08$RySt7CQNa5sDdZisCv9ST.NZ.65AJrn2vzWa.IBOpg0YliQJ5kBnS
/*
const userData = {
    username: "jjjjjasdf",
    password: "asdf*ujHuy",
    email: "emoadf"
}

const u = User.build(userData);

// validate
errors = u.validate();
if (errors) {
    for (var prop in errors) {
        if (errors.hasOwnProperty(prop))
            console.log("----------------",prop);
            for(var i in prop){
                if(prop.hasOwnProperty(i)){
                    console.log(prop[i]);
                }
            }
        }
}
else {
    // errors is null, which means validation succeeded
}*/