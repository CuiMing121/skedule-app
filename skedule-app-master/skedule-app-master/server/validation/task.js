const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTaskInput(data){
  let errors = {};

  data.tasktitle = !isEmpty(data.tasktitle) ?data.tasktitle : '';
  data.taskcontent = !isEmpty(data.taskcontent) ?data.taskcontent : '';
  data.complete_ratio = !isEmpty(data.complete_ratio) ?data.complete_ratio : '';
  
  if(!Validator.isLength(data.tasktitle, {min: 5, max: 50})){
    errors.tasktitle = 'Title must be between 5 and 50 characters';
  }

  if(Validator.isEmpty(data.tasktitle)){
    errors.tasktitle = 'Title field is required.';
  }

  if(!Validator.isLength(data.taskcontent, {min: 30, max: 500})){
    errors.taskcontent = 'Content must be between 30 and 500 characters';
  }

  if(Validator.isEmpty(data.taskcontent)){
    errors.taskcontent = 'Content field is required.';
  }

  if(Validator.isEmpty(data.complete_ratio)){
    errors.complete_ratio = 'Ratio field is required.';
  }
  
  return{
    errors,
    isValid: isEmpty(errors)
  }
}