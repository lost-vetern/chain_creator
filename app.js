var express=require('express'),
    passport=require('passport'),
    mongoose=require('mongoose'),
    //user=require('./user/users'),
    bodyParser=require('body-parser'),
    localStrategy=require('passport-local').Strategy,
    passportLocal = require('passport-local-mongoose');
var app=express();

mongoose.connect('mongodb://localhost:27017/gohar');
app.use(require("express-session")({
    secret: "abc",
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

//passport.use(new localStrategy(user.authenticate()));

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
  
//   passport.deserializeUser(function(id, done) {
//     user.findById(id, function (err, user) {
//       done(err, user);
//     });
//   });

var auth=false;
//chain maintainance
require('./chainRoutes')(app);

//contracts
// require('./smartcontract1')(app,passport);
// require('./smartcontract2')(app,auth);

app.post('/signup',(req,res)=>{
    console.log('signed up');
    user.register(new user({
        username : req.body.username,
    }),req.body.password,function(err,dbres){
        console.log(err);
        console.log(dbres);
        res.json({msg:dbres});
    }
    );
});

app.listen(4000,()=>{
    console.log("server is up");
});

