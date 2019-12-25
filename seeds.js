

var mongoose = require("mongoose"),
    Campground = require("./models/campgrounds"),
    Comment = require("./models/comments");

var data = [
    { 
      name:"The number one coffee",
      image:"https://images.unsplash.com/photo-1533656233758-30fa8762bf2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      desc:"The number one coffee"
    },
    { 
        name:"The number one coffee",
        image:"https://images.unsplash.com/photo-1503427073713-8e991db6befe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        desc:"The number one coffee"
      },
      { 
        name:"Coffe",
        image:"https://images.unsplash.com/photo-1519929125787-88a2485dc4f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        desc:"The number one coffee" 
      }
];



function seedDB(){
    Campground.remove({},function(error){
        if(error){
            console.log(error);
        } else {
            console.log("removed campgrouds");
        Comment.remove({}, function(err){
        if(err) console.log(err); else console.log("removed comments");    
        });
           for(var i=0; i<data.length;i++){
               Campground.create(data[i],function(err, newCamground){
                    if(err) 
                    {
                        console.log(err);
                    } 
                     else
                    {
                        console.log("added");
                        Comment.create({
                            text: "this is my first comment",
                            author: "by Ivar The Boneless"
                        },function(err, comment){
                             if(err) console.log(err);
                             else {
                                console.log("added comment");
                                newCamground.comments.push(comment);
                                newCamground.save();
                             }
                        });
                    }

                 });
            
           };   
           
          
           
        }
    });

};
    
module.exports =  seedDB;  

