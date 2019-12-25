
var express = require("express");
var router = express.Router();
var User = require("../models/user");
var request = require("request");
passport    = require("passport"),

router.get("/",function(req,res){
    
    res.render("landingpage");
});

router.get("/register",function(req, res){
    res.render("register");
});

router.get("/login",function(req, res){
    res.render("login");
});
// using middleware to login
router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"

}),function(req,res){

});

router.get("/logout", function(req,res){
    req.logout();
    req.flash("success","Log out successed! goodbye and have a happy day!!!");
    res.redirect("/login");
});
 
router.post("/register",function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    
    var user = new User({username:username});
     
    User.register(user, password,function(err,fuser){
        if(err) {
            req.flash("error", err.message);
            return res.render("register");
        } else  

        
            passport.authenticate('local')(req,res,function(){             
                res.redirect("/campgrounds");
               });
                     
    });
   
});

router.get("/search",function(req,res){
    var url ="https://jsonplaceholder.typicode.com/posts"; 
    request(url,function(error,response,body){
        if(!error && response.statusCode==200){
               var parsedData = JSON.parse(body);   
                      
              res.render("search",{ data: parsedData  });
      }
      else console.log("something bad happend");
    });
      
  });


module.exports = router;