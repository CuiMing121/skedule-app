const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterWithoutPWDInput(data){
  let errors = {};

  data.name = !isEmpty(data.name) ?data.name : '';
  
  data.sex = !isEmpty(data.sex) ?data.sex : '';
  data.job = !isEmpty(data.job) ?data.job : '';
  data.birthday = !isEmpty(data.birthday) ?data.birthday : '';
  data.homeplace = !isEmpty(data.homeplace) ?data.homeplace : '';

  if(!Validator.isLength(data.name, {min: 2, max: 30})){
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if(Validator.isEmpty(data.name)){
    errors.name = 'Name field is required.';
  }

  if(Validator.isEmpty(data.sex)){
    errors.sex = 'Sex field is required.';
  }
  if(Validator.isEmpty(data.job)){
    errors.job = 'Job field is required.';
  }
  if(Validator.isEmpty(data.birthday)){
    errors.birthday = 'Birthday field is required.';
  }
  if(Validator.isEmpty(data.homeplace)){
    errors.homeplace = 'HomePlace field is required.';
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}