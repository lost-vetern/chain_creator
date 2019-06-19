var express=require('express'),
    passport=require('passport'),
    mongoose=require('mongoose'),
    bodyParser=require('body-parser');
var app=express();

mongoose.connect('mongodb://localhost:27017/blockchain');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

require('./chainRoutes')(app);

app.listen(3000,()=>{
    console.log("server is up");
});

