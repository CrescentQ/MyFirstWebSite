var express     = require("express"),
    User        = require("./models/user"),
     overMethod  = require("method-override"),
    app         = express(),
    bodyPaser   = require("body-parser"),
    mongoose    = require("mongoose"),
    request     = require("request"),
    passport    = require("passport"),
    flash       = require("connect-flash"),
    LocalStrategy = require("passport-local"),
    expressSession          = require("express-session");
    require('dotenv').config();
var commentsRoutes = require("./routes/comments");
var campgroundsRoutes = require("./routes/campgrounds");    
var indexRoutes = require("./routes/index");

mongoose.Promise = global.Promise;

var url = process.env.DATABASE_URI || "mongodb://localhost:27017/yelp_camp";
//mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true,useUnifiedTopology: true});
mongoose.connect(url ,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex: true});
 


app.set("view engine","ejs");
app.use(bodyPaser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.static("partials"));
app.use(overMethod("_method"));
app.use(flash());

app.use(expressSession(
    {
        secret: "Ivar The Boneless",
        resave: false,
        saveUninitialized: false
    }
));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.deserializeUser(User.deserializeUser());
passport.serializeUser(User.serializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error =  req.flash("error");
    res.locals.success =  req.flash("success");
    next(); 
});

app.use(indexRoutes);
app.use(commentsRoutes);
app.use(campgroundsRoutes);

const port = process.env.PORT || 3000;

app.listen(port, process.env.IP, function(){
    console.log("server started");
});

