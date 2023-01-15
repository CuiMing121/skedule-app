const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//New model
const News = require('../../models/Order');

//Validation
const validateOrderInput = require('../../validation/order');

// @route Post api/news/test
// @desc Tests news route
// @access Public 
router.post('/test', (req, res)=>res.json({msg: 'Order Works'}));    

//@routes Post api/order/
//@desc Create order by manager
//@access Private
router.post('/',passport.authenticate('jwt',{session:false}), (req,res)=>{
    const {errors, isValid} = validateOrderInput(req.body);
    //Check validation
    if (!isValid){
      //id any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    if(req.user.job === "manager"){ 
        const newOrder = new Order({
            text: req.body.text,
        });
        newOrder.save().then(order=>res.json(order));
    }
    else
    {
        res.status(404).json({text: 'User must be manager.'});
    }
  });

//@routes Get api/posts/:date
//@desc Get post by date
//@access public
router.get('/all/:date',(req,res)=>{
    Order.find().then(orders=>{
        if(orders.length > 0){
            
            orders = orders.filter(order=> order.orderdate.toISOString().split("T")[0]===req.params.date);
            if(orders.length>0){
                return res.json(orders);
            }
            res.status(400).json({noorders: 'There is no order for this day.'});    
        }
        else
        {
            res.status(404).json({noorders: 'There is no order.'});
        }
    });
});

//@routes Get api/order/:id
//@desc Get post by id
//@access public
router.get('/:id', passport.authenticate('jwt',{session:false}),(req,res)=>{
    Order.findById(req.params.id)
      .then(order=>res.json(order))
      .catch(err=>res.status(404).json({noorderfound:'No order found with that ID'}));
  });

//@routes Post api/order/comment/:id
//@desc Add comment order
//@access Private
router.post('/comment/:id', passport.authenticate('jwt',{session:false}), (req,res)=>{
    const {errors, isValid} = validateOrderInput(req.body);
    //Check validation
    if (!isValid){
      //id any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    Order.findById(req.params.id)
      .then(order=>{
        const newComment = {
            text: req.body.text,
            name: req.user.name,
            user_id: req.user.id
          };
          
          //Check to see if comment exists
        if(order.comments.filter(comment=>comment.user_id.toString()===req.user.id).length > 0){
            //Get Remove index
          const removeIndex = order.comments
            .map(item=>item.user_id)
            .indexOf(req.user.id);
            

            //Splice comment out of array
            order.comments.splice(removeIndex,1);
        }           
        //Add to Comments array
        order.comments.unshift(newComment);

        //Save
        order.save().then(order=>res.json(order));
  
        })
      .catch(err=>res.status(404).json({ordernotfound: 'No order found'}));
  })
  
  //@routes Delete api/posts/comment/:id/:comment_id
  //@desc Remocve comment from post
  //@access Private
  router.delete('/comment/:id/:comment_id', passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    Order.findById(req.params.id)
      .then(order=>{
        //Check to see if comment exists
        if(order.comments.filter(comment=>comment._id.toString()===req.params.comment_id).length===0){
          return res.status(404).json({commentnoexists:'Comment does not exists.'});
        }
        
        //Get Remove index
        const removeIndex = order.comments
          .map(item=>item._id.toString())
          .indexOf(req.params.comment_id);
  
        //Splice comment out of array
        order.comments.splice(removeIndex,1);
  
        //Save
        order.save().then(order=>res.json(order));
      })
      .catch(err=>res.status(404).json({ordernotfound: 'No order found'}))
  })

//@routes Delete api/order/:id
//@desc Delete order by manager
//@access Private
router.delete('/:id', passport.authenticate('jwt',{session:false}), (req,res)=>{
    if(req.user.job === "manager"){ 
        Order.findById(req.params.id)
          .then(order=>{
            order.remove().then(()=>res.json({suceess: true}))
          })
          .catch(err=>res.status(404).json({ordernotfound:'No order found.'}))
    }
    else
    {
        res.status(404).json({roll: 'User must be manager.'});
    }
  });

  
module.exports = router;