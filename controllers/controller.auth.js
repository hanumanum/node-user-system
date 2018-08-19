var exports = module.exports = {}


exports.signup = function(req,res){
    res.render('signup',{    
                        message: req.flash('signupMessageError')[0]
                        ,formData: req.flash("formData")[0]
                    }); 
}

exports.signin = function(req,res){
	res.render('signin'); 
}

exports.dashboard = function(req,res){
	res.render('dashboard'); 
}

exports.logout = function(req,res){
    req.session.destroy(function(err) {
    res.redirect('/');
  });

}
