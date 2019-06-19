var block = require('./block');
var sha256 = require('js-sha256');

module.exports = function(app){
    //get list
    app.get('/blocklist',(req,res)=>{
        block.find({},function(err,dbres){
            if(err)console.log(err);
            else{
                console.log(dbres);
                res.json({'blocks':dbres});    
            }
        });
    });

    app.post('/addblock',(req,res)=>{
        block.find({},function(err,dbres){
            if(err)console.log(err);
            else{
                var previousHashTemp;
               if(dbres.length===0){previousHashTemp='genesis';}
               else{
                   previousHashTemp=dbres[dbres.length-1].hash;
                   console.log(previousHashTemp);}
                   var timeStampTemp=new Date().toGMTString();
                   var hashTemp=sha256(previousHashTemp+req.body.data+timeStampTemp);
                   console.log(hashTemp);
                //create new chain
                block.create(new block({
                    perviousHash: previousHashTemp,
                    data:req.body.data,
                    hash:hashTemp,
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
