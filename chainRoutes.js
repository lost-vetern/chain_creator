var block = require('./block');
var sha256 = require('js-sha256');

module.exports = function(app){
    //get list
    app.get('/blocklist',(req,res)=>{
        block.find({},function(err,dbres){
            if(err)console.log(err);
            else{
                console.log(dbres);
                res.json({'msg':dbres});
               
            }
        });
        ///res.json({msg:"fhjaskhf"});
    });

    app.post('/addblock',(req,res)=>{
        console.log('sdfhjaksf');
        block.find({},function(err,dbres){
            if(err)console.log(err);
            else{
                var previousHashTemp;
               if(dbres.length===0){previousHashTemp='genesis';}
               else{
                   previousHashTemp=dbres[dbres.length-1].hash;
                   console.log(previousHashTemp);}
                   var timeStampTemp=new Date().toGMTString();
                   var hashTemp=sha256(previousHashTemp+req.body.deligator+req.body.deligatee+req.body.policy+req.body.validDate+timeStampTemp);
                   console.log(hashTemp);
                //create new chain
                block.create(new block({
                    perviousHash: previousHashTemp,
                    deligator:req.body.deligator,
                    deligatee:req.body.deligatee,
                    policy:req.body.policy,
                    hash:hashTemp,
                    validDate:req.body.validDate,
                    timestamp:timeStampTemp   
                }),function(err,dbres){
                    console.log(err);
                    console.log(dbres);
                    res.json({msg:dbres});
                });        
                     
            }
        });
    });
}
