var express = require("express");
var router = express.Router();
var middleware = require("../middleware/index");

var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var index = require("./index");




router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.isLoggedIn, function(req, res){
    
    var id = req.params.id;
    var comment_id = req.params.comment_id;
    console.log("commentID1:"+comment_id);
    Comment.findById(comment_id, function(err, foundedComment){
if(err) res.redirect("back");
else {
    Campground.findById(id,function(err,foundedCamp){
     
        res.render("editComment",{
            foundedCamp:foundedCamp,
            foundedComment: foundedComment
        });
    });
}
    } );    
});

router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnerShip, function(req, res){
    
    var commentObj ={
        text: req.body.text,
    };
    Comment.findByIdAndUpdate(req.params.comment_id, commentObj, function(err, foundedComment){
if(err) res.redirect("back");
    else {
    res.redirect("/campgrounds/"+req.params.id);
}
    } );    
});

router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnerShip, function(req, res){    
  
    Comment.findByIdAndRemove(req.params.comment_id, function(err, foundedComment){
if(err) res.redirect("back");
else {
    res.redirect("/campgrounds/"+req.params.id);
}
    } );    
});


router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res){
    var id = req.params.id;
    console.log(id);    
    res.render("newComment",{data:id});
});

router.post("/campgrounds/:id/comments",middleware.isLoggedIn, function(req, res){
 
    var author = {
        id:req.user._id,
        username:req.user.username
    };
     
    Campground.findById(req.params.id,function(err, foundCamp){
        if(err)  console.log(err);
         else
        {
         Comment.create({
                text: req.body.text,
                author: author
            },function(err, comment){
                 if(err) console.log(err);
                 else {                    
                    foundCamp.comments.push(comment);
                    foundCamp.save();
                    req.flash("success","Comment added");
                    res.redirect("/campgrounds/"+req.params.id);
                 }
            });
        }

     });
   
});



module.exports = router;