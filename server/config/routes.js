var mongoose = require('mongoose');
var path = require('path');
var users = require('./../controllers/users.js');
var games = require('./../controllers/games.js');

module.exports = function(app){
  app.post('/', users.register);
  app.post('/login', users.login);
  // middleware declared to be used here:
  app.use(loginAuth);
  // all routes that use middleware before invoking functions
  app.get('/currentUser', users.currentUser);
  app.post('/create', games.create);
  app.get('/game', games.show);
  app.post('/answer/:id', games.answer);
  app.get('/getUsers', users.getUsers);
  // app.get('/getStats', games.getStats);
  // app.get('/profile', users.Profile);
  app.post('/logout', users.logout);

};
function loginAuth(req,res,next){
  if(req.session.user){
    next();
  }else{
    res.status(401).send("user not logged in");
  }
}
