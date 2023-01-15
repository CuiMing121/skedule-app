const { model } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    default: true
  },
  job: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: true
  },
  homeplace: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
  },
  home_number: {
    type: String,
  },
  jobdate: {
    type: String,
  }
});
module.exports = User = mongoose.model('users',UserSchema)