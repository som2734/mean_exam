var mongoose = require('mongoose')
var User = mongoose.model('User');

function UserController(){
  this.getAllUsers= function(req,res){
		User.find({}, function(err,users){
			res.json(users)
		})
	};
	this.register = function(req,res){
    console.log('data from client in reg server', req.body);
    if(req.body.password != req.body.conf_password){
      var errors = {errors:{
        general:{
          message: "Password does not match!"
        }
      }}
      res.json(errors);
      console.log(errors);
    }
    if(req.body.firstname < 2 || req.body.lastname < 2){
      var errors = {errors:{
        general:{
          message: "First and/or last name must be at least 2 characters!"
        }
      }}
      res.json(errors);
      console.log(errors);
    }
    if(req.body < 2){
      var errors = {errors:{
        general:{
          message: "Required info has not been provided!"
        }
      }}
      res.json(errors);
      console.log(errors);
    }
    else{
      var errors = {errors: {general: {message: "Succesfully registered, please login!"}}}
      var user = new User(req.body);
      user.save(function(err, user){
        if(err){
          res.sendStatus(500);
          console.log(err);
        }
        else{
          req.session.user = {
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
          }
          res.sendStatus(200);
        }
      });
    }
	};

  this.login = function(req,res){
    User.findOne({email: req.body.email}).exec(function(err, user){
      if(user.password != req.body.password){
          res.sendStatus(400);
      }else{
          req.session.user = {
            name: user.name,
            _id: user._id
          }
          res.send(user);
      }
    })
  };
  this.logout = function(req, res){
    req.session.user = null;
    res.redirect('/');
  };
  // this.Profile = function(req,res){
  //   User.findOne({_id: req.session.user}).exec(function(err, user){
  //     if(err){
  //       res.sendStatus(400);
  //     }else{
  //       var current = {
  //         firstname: user.firstname,
  //         lastname: user.lastname,
  //         _id: user._id
  //       }
  //       res.json(current);
  //     }
  //   })
  // };
  this.getUsers = function(req,res){
    User.find({}).exec(function(err,users){
      if(err){
        res.sendStatus(400);
      }
      else{
        res.json(users);
      }
    })
  };
  this.currentUser = function(req,res){
    User.findOne({_id: req.session.user}).exec(function(err, user){
      if(err){
        res.sendStatus(400);
      }else{
        var u = {
          firstname: user.firstname,
          lastname: user.lastname,
         _id:user._id
       }
        res.json(u);
      }
    })
  };
}

module.exports = new UserController();
