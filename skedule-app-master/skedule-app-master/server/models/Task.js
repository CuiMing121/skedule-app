const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const TaskSchema = new Schema({
  user_id:{
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  user_name:{
    type: String,
    required:true
  },
  taskdate:{
    type: String
  },
  tasktitle:{
    type: String,
    required: true
  },
  taskcontent:{
    type: String,
    required: true
  },
  complete_ratio:{
    type: String,
    required: true
  },
  extra:{
    type: String
  },
  answer:{
    type: String
  }
      
});

module.exports = Task = mongoose.model('task', TaskSchema);
