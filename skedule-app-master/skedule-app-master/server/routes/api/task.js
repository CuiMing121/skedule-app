const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load Input validation
const validateTaskInput = require('../../validation/task');


const Task = require('../../models/Task');


// @route GET api/task/test
// @desc Tests task route
// @access Public 
router.post('/test', (req, res)=>res.json({msg: 'Task Works'}));    

// @route POST api/task/
// @desc Create Task By Date
// @access Private 
router.post('/:date', passport.authenticate('jwt',{session:false}), (req, res)=>{
    const {errors, isValid} = validateTaskInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    
    const newtask = {
        user_id: req.user.id,
        user_name: req.user.name,
        taskdate:  req.params.date,
        tasktitle: req.body.tasktitle,
        taskcontent: req.body.taskcontent,
        complete_ratio: req.body.complete_ratio,
        extra: req.body.extra
    };
    Task.findOne({user_id:req.user.id, taskdate: req.params.date}).then(task=>{
        if(task){
          //Update
          Task.findOneAndUpdate(
            {user_id:req.user.id, taskdate: req.params.date},
            {$set: newtask},
            {new :true}
          ).then(task=>res.json(task));
        }else{
          //Create
            new Task(newtask).save().then(task=>res.json(task));
          }
    });
});
  
//@routes Get api/task/:date
//@desc Get task by date
//@access public
router.get('/:date', passport.authenticate('jwt',{session:false}),(req,res)=>{
    Task.findOne({user_id:req.user.id, taskdate: req.params.date}).then(task=>{
        if(task){
            res.json(task);
        }
        else
        {
            res.status(404).json({notaskfound:'No Task found of this Date'})
        }
    })
  });

//@routes Get api/task/all/:date
//@desc Get task by date by manager
//@access private
router.get('/all/:date', passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.user.job === "manager"){
        Task.find({taskdate: req.params.date})
        .then(tasks=>{
            if(tasks.length == 0){
                errors.notasks = 'There is no task of this day';
                res.status(404).json(errors);
            }
            res.json(tasks);        
        })
        .catch(err=>res.status(404).json({notasks: 'There is no task.'}));
    }
    else
    {
        res.status(404).json({roll: 'User must be manager.'});
    }
  });

//@routes Get api/task/one/:user_id/:date
//@desc Get task of specifice user and date by manager
//@access private
router.get('/one/:user_id/:date', passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.user.job === "manager"){
        Task.findOne({user_id:req.params.user_id, taskdate: req.params.date})
        .then(task=>{
            if(!task){
                res.status(404).json({notasks: 'There is no task of this User Today.'});
            }
            res.json(task);        
        })
        .catch(err=>res.status(404).json({notasks: 'There is no task.'}));
    }
    else
    {
        res.status(404).json({roll: 'User must be manager.'});
    }
  });

//@routes Post api/task/one/:user_id/:date
//@desc Put answer to the task of specifice user and date by manager
//@access private
router.post('/one/:user_id/:date', passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.user.job === "manager"){
        Task.findOneAndUpdate({user_id: req.params.user_id, taskdate: req.params.date}, {$set:{answer: req.body.answer}}, {new: true})
        .then(task => {
            if(task)
            {
                res.json(task);
            }
            else
            {
                res.status(404).json({updateError: 'Something wrong when updating data!'});
            }
        })
        .catch(err=>res.status(404).json({notasks: 'There is no task.'}));
    }
    else
    {
        res.status(404).json({roll: 'User must be manager.'});
    }
  });



//@routes Get api/task/each/:year/:month
//@desc Get task by month and year
//@access private
router.get('/each/:year/:month', passport.authenticate('jwt',{session:false}),(req,res)=>{
    Task.find({user_id:req.user.id}).then(tasks=>{
        if(tasks.length > 0){
            tasks = tasks.filter(task=> task.taskdate.split("-")[1]===req.params.month && task.taskdate.split("-")[0]===req.params.year);
            if(tasks.length>0){
                return res.json(tasks);
            }
            res.status(400).json({notasks: 'There is no task for these year and month.'});    
        }
        else
        {
            res.status(404).json({notasks: 'There is no task.'});
        }
    })
  });

//TODO
//@routes Delete api/task/:date 
//@desc Delete tasks of given date by manager
//@access Public
router.delete('/:date', passport.authenticate('jwt', {session:false}), (req,res)=>{
    if(req.user.job === "manager"){
        Task.deleteMany({taskdate: req.params.date}).then(tasks=>{
            res.json({success:true});  
        })
    }
    else
    {
        res.status(404).json({roll: 'User must be manager.'});
    }
});
module.exports = router;