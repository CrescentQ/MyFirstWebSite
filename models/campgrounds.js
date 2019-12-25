
var mongoose    = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: String,
    price:Number,
    image: String,
    desc: String,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
      }
    ],
    author:{
      id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
      username:String
    }
});

module.exports = mongoose.model("Campground",campgroundSchema);