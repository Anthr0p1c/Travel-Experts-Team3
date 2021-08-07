/*
David Grant
Sujani Wijesundera
2021/07/25
CPRG-008
Assignment 2
*/

var express = require("express")
// Model for customer schema
const RegisterCust = require("../models/postRegisterMdl").RegisterCust
const router = express.Router()
const bcrypt = require("bcryptjs");
const Post = require('../models/postRegisterMdl').Post; // Get the Customer collection
var custId = 0;


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Travel Experts' })
  })
  

// router.get('/create', function (req, res, next) {
//   //get the maximum _id and add one to create a new id
//   Post.find()
//     .sort({ _id: -1 })
//     .limit(1)
//     .then(Post => {
//       custId = Post[0]._id;
//     });

//   res.render('/', {

//   });
// });


  

// Post registration form to database
router.post("/", (req,res,next) => {

  // res.status(204).send()
  // bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
  //   if (err) throw err;

  const register = new RegisterCust()

  register.email = req.body.email,
  register.password = req.body.password,
  register.fname = req.body.fname,
  register.lname = req.body.lname,
  register.address = req.body.address,
  register.postal = req.body.postal,
  register.province = req.body.province,
  register.country = req.body.country


  custId = custId + 1;  //increase existing id by one
  register._id = custId;
  register.CustomerId = custId.toString();
  register.role = "Senior Agent";
  register.AgentId = 1;
  // register.password = hashedPassword;
  
  // Render error array if errors, otherwise save data to database and redirect to thank you page
  register.save(err => {
      if (err) {
          const errorArray = [];
          const errorKeys = Object.keys(err.errors);
          errorKeys.forEach(key => errorArray.push(err.errors[key].message));
          return 
          
           
      }
        // next()
        // res.redirect("/post/addregistration?user=" + req.body.firstname);
        // res.end()
        res.redirect("/")
    })
  
})



module.exports = router