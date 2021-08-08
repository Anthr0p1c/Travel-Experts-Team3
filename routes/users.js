/*
*Author:Sujani Wijesundera
Date:29/07/2021
CPRG008
Control user registration - Add user/Validation when creating the user
*/

var express = require("express");
var router = express.Router();
const { User } = require("../models/user");
//const User = require('../models/postRegisterMdl').User; // Get the Customer collection
const bcrypt = require("bcryptjs");
var custId = 0;

const pageRegister = {
  pagetitle: "Sign-Up",
  pageheading: "Create a new account",
  pagemessage: "Please enter the required information to create a new account.",
  hideLogin: true,
};
const pageShowPosts = {
  pagetitle: "Blog posts",
  pageheading: "List all posts",
  pagemessage: "These are all postets.",
};


/* print user a message after registering. */
router.get('/addregistration', function (req, res, next) {
  const firstName = req.query.user;
  res.send('<br><br><b><center><font style=color:blue;>' + firstName + '</font>, You are successfully Registed! Thank You for registering with us!<br><br><a href="/">Home</a></center></b>');
});

router.get('/login', function (req, res, next) {

  //const firstName = req.query.user;
  res.send('<br><br><b><center><font style=color:blue;>vv</font>, You are successfully login! Thank You for registering with us!<br><br><a href="/">Home</a></center></b>');
});



// Show the user to registration form
router.get('/create', function (req, res, next) {
  //get the maximum _id and add one to create a new id
  User.find()
    .sort({ _id: -1 })
    .limit(1)
    .then(User => {
      custcustIdId = User[0]._id;
    });

  res.render('register', {
    title: "register",
    imgPath: "/img/Logo.jpg"
  });
});


// Submit new user creationto the database
router.post('/create', function (req, res, next) {


  //password encryption
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) throw err;
    // Replace the plain password with the hashed password

    const user = new User();

    custId = custId + 1;  //increase existing id by one


    user._id = custId;
    user.CustomerId = custId.toString();
    user.CustFirstName = req.body.firstname;
    user.CustLastName = req.body.lastname;
    user.CustAddress = req.body.address;
    user.CustCity = req.body.city;
    user.CustProv = req.body.province;
    user.CustCountry = req.body.country;
    user.CustHomePhone = req.body.homephone;
    user.CustBusPhone = req.body.businessphone;
    user.CustEmail = req.body.email;
    user.username = req.body.email;
    user.password = req.body.password;
    user.role = "customer";
    user.AgentId = 0;


    const errs = user.validateSync(); // Run the model validation
    if (errs) {
      return processErrors(errs, req, res);
    }
    user.password = hashedPassword;
    // Store the use object in the DB with hashed password
    user.save((err, result) => {
      if (err) {
        console.log("Error", err);
        const errorArray = [];
        const errorKeys = Object.keys(err.errors);
        errorKeys.forEach(key => errorArray.push(err.errors[key].message));
        return res.render("register", {
          imgPath: "/img/Logo.jpg",
          postdata: req.body, // to display entered values in text boxes when error occur.
          errors: errorArray
        });
      }
      res.redirect("/post/addregistration?user=" + req.body.firstname); // Redirect to thank you page
    });
  });
});


//Errors stores in the array and show in the front end when error occurs
function processErrors(errs, req, res) {
  // If there are errors from the Model schema
  const errorArray = [];
  const errorKeys = Object.keys(errs.errors);
  errorKeys.forEach((key) => errorArray.push(errs.errors[key].message));
  return res.render("register", {
    //...pageRegister,
    imgPath: "/img/Logo.jpg",
    errors: errorArray,
    postdata: req.body
  });
}

module.exports = router;
