var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var session = require('express-session')

// Session configuration
var config = {
 secret:'CookieMonster', // Secret name for decoding secret and such
 resave:false, // Don't resave session if no changes were made
 saveUninitialized: true, // Don't save session if there was nothing initialized
 name:'myCookie', // Sets a custom cookie name
 cookie: {
  secure: false, // This need to be true, but only on HTTPS
  httpOnly:false, // Forces cookies to only be used over http
  maxAge: 3600000
 }
}
// set an environment variable called APPROOT to keep track of the root folder of your app
// KEVIN SAID: can just use __dirname if you want...
process.env['APPROOT'] = __dirname;

// Setting up body-parser
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
// add directory for static files you wrote to serve html and js files to the browser
app.use(express.static('./client'));
// also add a directory for static files from the bower library
app.use(express.static('./bower_components'));
app.use(session(config));

app.use(function(req,res,next){
  console.log(req.session);
  next();
});

// require mongoose configuration, use path.join to build the route
require(path.join(process.env['APPROOT'], 'server/config/mongoose.js'));
// require routes configuration, get a function from the module.exports, that gets invoked while passing it the app
require(path.join(process.env['APPROOT'], 'server/config/routes.js'))(app);



// start the server
app.listen(8000, function(){
  console.log('listening on port 8000');
});
