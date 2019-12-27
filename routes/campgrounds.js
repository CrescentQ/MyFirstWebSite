
var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var index = require("./index");
var middleware = require("../middleware/index");
var weather = require("../models/weather");



router.get("/campgrounds", function(req, res){
    // get all camgrounds from db

        Campground.find({},function(err, allCamgrounds){
            if(err){
                console.log("oops something bad happend, added not successful");
            }else  {
                weather.findWeather("Ho Chi Minh",function(data){
                             console.log(data)
                            res.render("campgrounds", {campground: allCamgrounds, data:data});
                        
                    
                });
                
            }
        }
        );
    });

    router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
        var name = req.body.name ;
        var image = req.body.image;
        var desc = req.body.desc;
        var price = req.body.price;
        var author = {
             id:req.user._id   ,
             username:req.user.username
            }
        var newCampgroud = {name:name, image: image,price:price, desc: desc, author:author};
        // get all camgrounds from db
            Campground.create({ 
                name: name,
                image: image,
                desc: desc,
                price:price,
                author :
                 {
                    id:req.user._id ,
                    username:req.user.username
                }
            },function(err, newlyCreated){
                if(err){
                    console.log("oops something bad happend, added not successful");
                }else  {
                     res.redirect("/campgrounds");
                }
            }
            );
        });

    
        router.get("/campgrounds/new",middleware.isLoggedIn,function(req, res){
            res.render("new");
            });

        router.get("/campgrounds/:id/edit", middleware.checkCampOwnerShip, function(req,res){    
            Campground.findById(req.params.id, function(err, foundedCamp)   {
                res.render("edit",{editCamp:foundedCamp});
            })  
            
           });
           
            router.put("/campgrounds/:id", middleware.checkCampOwnerShip, function(req,res){
                             
                var obj = {
                    name: req.body.name,
                    image:req.body.image,
                    desc: req.body.desc,
                    price:req.body.price
                };
                Campground.findByIdAndUpdate(req.params.id,obj, function (err, foundedCamp){
                    if(err){
                        console.log("oops id not exist");
                    }
                    else res.redirect("/campgrounds");     
            });
            });
            
                router.delete("/campgrounds/:id",middleware.checkCampOwnerShip,function(req,res){
                    Campground.findByIdAndDelete(req.params.id, function(err){
                            if(!err){
                                res.redirect("/campgrounds");
                            }
                            else console.log("cant delete");
                    });
            });
            router.get("/campgrounds/:id" ,function(req, res){
                     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
                    if(err){
                        console.log(err);
                       
                    } else {
                           res.render("show",{data:foundCamp});
                    };
                });

                });       
                


  
module.exports = router;