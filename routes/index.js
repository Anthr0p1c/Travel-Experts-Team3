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
var mongoose = require('mongoose');
// var register = mongoose.connection.models["customers"]
const router = express.Router()
const bcrypt = require("bcryptjs");
var custId = 0;


/* GET home page. */
router.get('/', function(req, res, next) {
    var currentUser = res.locals.currentUser
    res.render('index', { title: 'Travel Experts', userName:currentUser })
  })




/* print user a message after registering. */
// router.get('/addregistration', function (req, res, next) {
//   const email = req.query.email;
//   res.render("/", {userName:email})
//  });

// router.get('/login', function (req, res, next) {

//   const email = req.query.email;
//   res.render("/", {userName:email})
// });
  
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

  const register = new RegisterCust()
  

    

  register.CustEmail = req.body.email,
  // register.password = req.body.password,
  register.CustFirstName = req.body.fname,
  register.CustLastName = req.body.lname,
  register.CustAddress = req.body.address,
  register.CustPostal = req.body.postal,
  register.CustProv = req.body.province,
  register.CustCountry = req.body.country
  register.CustHomePhone = req.body.phone
  register.CustBusPhone = req.body.phone
  register.CustCity = req.body.city

  custId = custId + 1;  //increase existing id by one
  register._id = custId;
  register.CustomerId = custId.toString();
  // register.role = "Senior Agent";
  register.AgentId = 1;

  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) throw err;
    register.password = hashedPassword;
  })
  
  // Render error array if errors, otherwise save data to database and redirect to thank you page
  register.save(err => {
      if (err) {
          const errorArray = [];
          const errorKeys = Object.keys(err.errors);
          errorKeys.forEach(key => errorArray.push(err.errors[key].message));
          return 
          
          
      }

        // res.redirect("/post/addregistration?user=" + req.body.email);
        res.redirect("/")
      })
    
  
})



module.exports = router