console.log('users model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	firstname:{type: String, required: true, minlength: 2, trim: true},
  lastname:{type: String, required:true, minlength: 2, trim: true},
  password: {type:String, required:true, minlength: 4, trim: true},
  email: {type: String, required:true, minlength: 8, trim: true},
	scores:[{type: Schema.Types.ObjectId, ref: 'Game'}],
	created_at: {type: Date, default: Date.now}
});

mongoose.model('User', UserSchema);
var User = mongoose.model('User');
mongoose.Promise = global.Promise;
