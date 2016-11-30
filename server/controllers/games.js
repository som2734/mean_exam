var mongoose = require('mongoose')
var Game = mongoose.model('Game');
var User = mongoose.model('User');

function GameController(){

  this.create = function(req,res){
    var game = new Game(req.body);
    game.save(function(err, game){
      if(err){
        console.log(err);
      }
      else{
        res.json(game);
      }
    })
  };

  this.show = function(req,res){
    Game.find({}, function(err, trivia){
      if(err){
        console.log(err);
        res.json(err);
      }
      else{
        res.json(trivia);
        console.log('show game', trivia);
      }
    });
  };

  // this.play = function(req,res){
  //   Game.findOne({_id: req.params.id}).populate({path: '_user', populate: {path: 'scores'}}).exec(function(err, game){
  //     if(err){res.json(err);}
  //     else{
  //       var user = req.session.user;
  //       game.score = req.body.answer;
  //       game.save(function(err){
  //         if(err){
  //           console.log(err);
  //           res.json(err);
  //         }
  //         else{
  //           user.scores.push(game.score);
  //           user.save(function(err){
  //             if(err){
  //               console.log(err);
  //               res.json(err);
  //             }
  //             else{
  //               res.json(game.score);
  //             }
  //           })
  //         }
  //       })
  //     }
  //   })
  // };
  this.answer = function(req,res){
    Game.findOne({_id: req.params.id}).populate({path: '_user', populate: {path: 'scores'}}).exec(function(err,game){
      console.log('server controller answer--->', req.params.id);
      if(err){res.json(err);}
      else{
        game._user = req.session.user;
        game.score += 1;
        console.log(game);
        game.save(function(err){
          if(err){res.json(err);}
          else{
            User.findOne({_id: req.session.user}).exec(function(err, user){
              if(err){res.json(err);}
              else{
                user.scores.push(game._id);
                user.save(function(err, result){
                  if(err){res.json(err);}
                  else{
                    res.json(true);
                  }
                })
              }
            })
          }
        })
      }
    });
  };
  //
  // this.fakeA = function(req,res){
  //   Game.findOne({_id: req.params.id}).populate({path: '_user', populate: {path: 'scores'}}).exec(function(err,game){
  //     console.log('server controller voted answer--->', req.params.id);
  //     if(err){res.json(err);}
  //     else{
  //       var user = req.session.user;
  //       game.score += 0;
  //       game._user.scores.push(game.score);
  //       game.save(function(err){
  //         if(err){res.json(err);}
  //         else{
  //           res.json(game.score);
  //         }
  //       })
  //     }
  //   });
  // };
  //
  // this.fakeB = function(req,res){
  //   Game.findOne({_id: req.params.id}).populate({path: '_user', populate: {path: 'scores'}}).exec(function(err,game){
  //     console.log('server controller voted answer--->', req.params.id);
  //     if(err){res.json(err);}
  //     else{
  //       var user = req.session.user;
  //       game.score += 0;
  //       game._user.scores.push(game.score);
  //       game.save(function(err){
  //         if(err){res.json(err);}
  //         else{
  //           res.json(game.score);
  //         }
  //       })
  //     }
  //   });
  // };

};
module.exports = new GameController();
