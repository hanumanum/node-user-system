const lg = require("../utils/authAndRoles");
const ef = require("express-fileupload");
const math = require("../utils/math");

module.exports = function (app) {
    app.use(ef());
    
    app.post('/api/files/upload'
        , lg.isLoggedIn
        , lg.haveRights
        , function (req, res) {
            if(!req.files){
                return res.status(400).send('No files were uploaded.');
            }
            else{
                let file = req.files.image;
                let fileExt = file.name.split(".").pop(); 
                let newFileName = Date.now() + "_" + math.generateToken();
                let fileRealPath = nusRoot + "/static/uploads/" + newFileName + "." + fileExt;
                let flieRelativePath =  "/uploads/" + newFileName + "." + fileExt;
                file.mv(fileRealPath,function(err){
                    if(err){
                        return res.status(400).send('Cannot upload file.');
                    }
                    else{
                        return res.json({"status":"uploaded","filename":flieRelativePath});
                    }
                });
            }

        });

}