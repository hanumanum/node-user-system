const db = require("./configs/db");
const User = require("./models/user");

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
}