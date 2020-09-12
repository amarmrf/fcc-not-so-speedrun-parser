// server.js
// where your node app starts
/*{
  "ipaddress":"159.20.14.100",
  "language":"en-US,en;q=0.5", 
  "software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"
  }*/


// init project
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var headerParser = require('header-parser')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(headerParser);

app.get("/api/whoami",
(req,res)=>{
//apparently console.log(req.header return a function)
//console.log(req.header.toString())
//so if we do below, in the page we can see what the code on the console log above mean
//let us try something
console.log(req.getParsed("/api/whoami"))
res.json({"ipaddress":req.headers["x-forwarded-for"],"language":req.headers["accept-language"],"software":req.headers["user-agent"]
//,"TEST":req.headers
})
}//close handler
);//close method

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
