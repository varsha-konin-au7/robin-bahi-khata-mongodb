// Importing the necessary modules

require('dotenv').config();
process.env.SECRET_KEY = 'secret'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/signup');
const { sendEmail, generate_otp } = require("../validation/validation");


var controllers = {

  register : (req,res,next)=>{
    //hashsync will not return the promise but only the hashed password
    let hashedPassword = bcrypt.hashSync(req.body.password,10)
    let sign_up = new User({
        first_name: req.body.first_name,
        last_name : req.body.last_name,
        firm_name:req.body.firm_name,
        email:req.body.email,
        password: hashedPassword
    })
    

    // console.log(hashedPassword)
    const message = `Welcome to Bahi_Khata Family`
    
    try {
        sendEmail({
            email:sign_up.email,
            message
        })
    }catch (error) {
      console.log(err)
        res.status(500).json({
          
            message:"Couldn't send the email",
            errors:error
        })
    }
    sign_up.save()
    .then(function(val){
        res.status(201).json({
            message:`Please verify the otp which is sent to the given email address ${sign_up.email}`
        })
    })
    .catch((err)=>{
        res.status(400).json({
            message:"Error in creating user",
            error:err.message
        })
    })
},

/*Verify the otp sent through mail. 
If verified, will redirect to login page else redirect to signup page*/

verify_otp:(req,res)=>{
    let otp = req.body.otp
    if(otp === generate_otp){
        res.status(200).json({
            message:"Email successfully verified....please login to continue",
            // redirect:"/api/v1/users/login"
        })
    }else{
        res.status(404).json({
            message:"Invalid OTP",
            // redirect:"/api/v1/users/signup"
        })
    }
},


  login : (req, res) => {
      User.findOne({
        email: req.body.email
      })
        .then(user => {
          if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
              // Passwords match
              const payload = {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
              }
              SECRET_KEY = "secret"
              let token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: 1440
              })
              res.json({token:token})
            } else {
              // Passwords don't match
              res.json({ error: 'User does not exist' })
            }
          } else {
            res.json({ error: 'User does not exist' })
          }
        })
        .catch(err => {
          res.send('error: ' + err)
        })
    },

    profile : (req, res) => {
      SECRET_KEY = "secret"
      var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    
      User.findOne({
        _id: decoded._id
      })
        .then(user => {
          if (user) {
            res.json(user)
          } else {
            res.send('User does not exist')
          }
        })
        .catch(err => {
          res.send('error: ' + err)
        })
    },
  }

module.exports = controllers;


