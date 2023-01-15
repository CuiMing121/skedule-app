const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load Input validation
const validateRegisterInput = require('../../validation/register');
const validateRegisterWithoutPWDInput = require('../../validation/registerwithoutPwd');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');

// @route GET api/users/test
// @desc Tests users route
// @access Public 
router.get('/test', (req, res)=>res.json({msg: 'Users Works'}));              

// @route POST api/users/register
// @desc Register User
// @access Public 
router.post('/register', (req, res)=>{
    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({name: req.body.name})
        .then(user => {
            if(user){
                errors.name  = 'Name already exists.';
                 return res.status(400).json(errors);
            } else{
                const newUser =  new User({
                    name: req.body.name,
                    password: req.body.password,
                    sex: req.body.sex,
                    job: req.body.job,
                    birthday: req.body.birthday,
                    homeplace: req.body.homeplace,
                    phone_number: req.body.phone_number,
                    home_number: req.body.home_number,
                    jobdate: req.body.jobdate
                });   
                
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })                    
                })
            }
        });
});

// @route GET api/users/login
// @desc Login User/Returning JWT token
// @access Public 
router.post('/login', (req, res)=>{
  const {errors, isValid} = validateLoginInput(req.body);

  if(!isValid){
      return res.status(400).json(errors);
  }

  const name = req.body.name;
  const password = req.body.password;
  
  //Find user by email
  User.findOne({name})
      .then(user=>{
          if(!user){
              errors.name  = 'User not found.';
              return res.status(400).json(errors);
          }

          //check password
      
          bcrypt.compare(password, user.password)
              .then(isMatch=>{
                  if(isMatch){
                      //User Matched

                      const payload = {id: user.id, name: user.name, job: user.job
                                }

                      //Sign Token
                      jwt.sign(
                          payload, 
                          keys.secretOrKey, 
                          { expiresIn: 3600 },
                          (err,token)=>{
                              res.json({
                                  success: true,
                                  token: "Bearer " + token
                              });
                          });
                  }else{
                      errors.password = 'Password incorrect';
                      return res.status(400).json(errors)
                  }
               })
      });
});

// @route GET api/users/current
// @desc Return current user
// @access Private 
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    //res.json(req.user);
    res.json({
        id: req.user.id,
        name: req.user.name
    });
});

//@routes GET api/users/:user_id
//@desc current users profile
//@access Private
router.get('/',passport.authenticate('jwt', {session :false}),(req,res)=>{
    const errors = {};
    User.findById(req.user.id)
            .then(profile =>{
              if(!profile){
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
              }
              res.json(profile);
            })
            .catch(err=>res.status(404).json(err));
  });

//@routes Get api/users/all
//@desc Get all profiles if logined user is manager
//@access Private
router.get('/all',passport.authenticate('jwt', {session :false}),(req,res)=>{
    const errors = {};
    if(req.user.job === "manager"){
        User.find()
        .then(profiles=>{
            if(!profiles){
                errors.noprofile = 'There are no profiles';
                res.status(404).json(errors);
            }
            res.json(profiles);        
        })
        .catch(err=>res.status(404).json({profile: 'There no profiles.'}));
    }
    else
    {
        errors.roll = 'User must be manager.';
        res.status(404).json(errors);
    }
  })

//@routes Post api/users/
//@desc update user own profile
//@access private
router.post('/', passport.authenticate('jwt',{session:false}),(req,res)=>{
 
    if(!req.body.isChecked) 
    {
        const {errors, isValid} = validateRegisterWithoutPWDInput(req.body);
        if(!isValid){
            return res.status(400).json(errors);
        }
        const newUser = {
            sex: req.body.sex,
            job: req.body.job,
            birthday: req.body.birthday,
            homeplace: req.body.homeplace,
            phone_number: req.body.phone_number,
            home_number: req.body.home_number,
            jobdate: req.body.jobdate,
        };

        User.findOneAndUpdate({_id: req.user.id}, {$set:newUser}, {new: true})
        .then(user => {
            if(user)
            {
                res.json(user);
            }
            else
            {
                errors.updateError = 'Something wrong when updating data!';
                console.log({errors});
                res.status(404).json({errors});
            }
        })
        .catch(err=>res.status(404).json({nouser: 'There is no user.'}));
    }
    else{
        const {errors, isValid} = validateRegisterInput(req.body);
        if(!isValid){
            return res.status(400).json(errors);
        }

        const newUser = {
            password: req.body.password,
            sex: req.body.sex,
            job: req.body.job,
            birthday: req.body.birthday,
            homeplace: req.body.homeplace,
            phone_number: req.body.phone_number,
            home_number: req.body.home_number,
            jobdate: req.body.jobdate,
        };
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                User.findOneAndUpdate({_id: req.user.id}, {$set:newUser}, {new: true})
                    .then(user => {
                        if(user)
                        {
                            res.json(user);
                        }
                        else
                        {
                            errors.updateError = 'Something wrong when updating data!';
                            console.log({errors});
                            res.status(404).json({errors});
                        }
                    })
                    .catch(err=>res.status(404).json({nouser: 'There is no user.'}));
            })                    
        })   
    }
  });

//@routes Delete api/users/:user_id 
//@desc Delete user by manager
//@access Public
router.delete('/:user_id', passport.authenticate('jwt', {session:false}), (req,res)=>{
    if(req.user.job === "manager"){
        User.findOneAndRemove({_id: req.params.user_id})
        .then(()=>{
            res.json({success:true});
        });
    }
    else
    {
        res.status(404).json({roll: 'User must be manager.'});
    }
});
module.exports = router;