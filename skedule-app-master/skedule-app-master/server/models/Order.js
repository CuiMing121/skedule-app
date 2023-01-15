const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema

const OrderSchema = new Schema({
  user_id:{
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  orderdate:{
    type: Date,
    default: Date.now
  },
  text:{
    type: String,
    required: true,
  },
  comments:[
    {
      user_id:{
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text:{
        type: String,
        required: true
      },
      name:{
        type: String
      },
      date:{
        type: Date,
        default: Date.now
      }
    }    
  ],
});

module.exports = Order = mongoose.model('order',OrderSchema);