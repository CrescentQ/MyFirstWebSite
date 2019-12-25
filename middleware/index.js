
var middlewareObj = {};
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");


middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else {
    req.flash("error","Please log in first");
    res.redirect("/login");
    }
};

middlewareObj.checkCampOwnerShip =  function(req,res,next){
    if(req.isAuthenticated){
        Campground.findById(req.params.id, function(err, foundedCamp){
         if(err){
      
            req.flash("error", err.message);
            res.redirect("back");
         } else     {
            if(req.user._id && req.user._id.equals(foundedCamp.author.id)){
             next();
             } else {                
                req.flash("error", "You dont have permission to do that");
                res.redirect("/campgrounds");                
                };
         }
        });
     } else {        
        req.flash("error", "You need to log in first");
        res.redirect("/login");


        
     }
   
                  
};

middlewareObj.checkCommentOwnerShip = function(req,res,next){
    if(req.isAuthenticated){
        Comment.findById(req.params.comment_id, function(err,foundedComment){
            if(err) res.redirect(back);
            else {
                if(req.user._id.equals(foundedComment.author.id)){
                    next();
                } else res.redirect("back");
            }
        });
        }

};


module.exports = middlewareObj;