var express = require('express'),
    app = express();

var bodyParser = require('body-parser')
var cors = require('cors')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.post('/publish',(req,response) => {
  var myObj = {}
  myObj.Name = req.body.Name
  myObj.Topic = req.body.Topic
  myObj.Content = req.body.Content

  console.log(myObj);

  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("publishData").insert(myObj, function(err, res) {
    if (err) throw err;
    console.log("published");
    db.close();
    response.send("Published");
  });
});

});


app.post('/subscribe',(req,response) => {

  console.log(req.body.categoryArray);

  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("subscribe").insert(req.body, function(err, res) {
    if (err) throw err;
    console.log("subscribed");
    db.close();
    response.send("Subscribed");
  });
});

});


app.get('/getData',(req,response) => {

  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("subscribe").find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result.slice(-1)[0]);
    result=result.slice(-1)[0];
    var citerion={};
    citerion['$or']=result.categoryArray;
    dbo.collection("publishData").find(citerion).toArray(function(err,output){
      response.send(output)
    });
    //  find all those posts which comes under that
  });
});

});


app.get('/hey',function(req,res){
    console.log('I am hit');
    res.send('hey');
});


app.listen(3000);
console.log("app running at http://localhost:3000");
