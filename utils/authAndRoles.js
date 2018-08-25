

module.exports = {
    isLoggedIn:function(req, res, next) {
        //TODO remove leter, just for development
        return next();
        
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    },
    haveRights:function(req, res, next){
        //TODO: implement later
        return next();
    }
    
}