
const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    maxlength: 15,
    required: true,
    unique: true
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('User', UserSchema);
