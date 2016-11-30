console.log('game model');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GameSchema = new mongoose.Schema({
  question: {type: String, required: true, minlength: 15},
  answer: {type: String},
  fakeA: {type: String},
  fakeB: {type: String},
  score: {type: Number, default: 0},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  created_at: {type: Date, default: Date.now}
});

mongoose.model('Game', GameSchema);
var Game = mongoose.model('Game');
mongoose.Promise = global.Promise;
