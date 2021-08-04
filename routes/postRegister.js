/*
*Author:Sujani Wijesundera
Date:20/07/2021
*/

var express = require('express');
var router = express.Router();
const Post = require('../models/postRegisterMdl').Post; // Get the Customer collection
var custId = 0;

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

/* print user a message after registering. */
router.get('/addregistration', function (req, res, next) {
  const firstName = req.query.user;
  res.send('<br><br><b><center><font style=color:blue;>' + firstName + '</font>, You are successfully Registed! Thank You for registering with us!<br><br><a href="/">Home</a></center></b>');
});


// Show the user to registration form
router.get('/create', function (req, res, next) {
  //get the maximum _id and add one to create a new id
  Post.find()
    .sort({ _id: -1 })
    .limit(1)
    .then(Post => {
      custId = Post[0]._id;
    });

  res.render('register', {
    title: "register",
    imgPath: "/img/Logo.jpg"
  });
});

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   var dbo = db.db("travelexperts");
//   //Sort the result by name:
//   var sort = { _id: -1 };
//   //var mysort = { name: -1 };
//   dbo.collection("customers").find().limit(1).sort(sort).toArray(function (err, result) {
//     if (err) throw err;
//     custId = result[0]._id;

//     // db.close();
//   });
// });


// Submit new user creationto the database
router.post('/create', function (req, res, next) {

  const post = new Post();

  custId = custId + 1;  //increase existing id by one
  post._id = custId;
  post.CustomerId = custId.toString();
  post.CustFirstName = req.body.firstname;
  post.CustLastName = req.body.lastname;
  post.CustAddress = req.body.address;
  post.CustCity = req.body.city;
  post.CustProv = req.body.province;
  post.CustCountry = req.body.country;
  post.CustHomePhone = req.body.homephone;
  post.CustBusPhone = req.body.businessphone;
  post.CustEmail = req.body.email;
  post.CustPassword = req.body.password;

  post.role = "customer";
  post.AgentId = "0";

  post.save(err => {

    if (err) {
      console.log("Error");
      const errorArray = [];
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach(key => errorArray.push(err.errors[key].message));
      return res.render("register", {
        imgPath: "/img/Logo.jpg",
        postdata: req.body, // to display entered values in text boxes when error occur.
        errors: errorArray
      });
    }
    res.redirect("/post/addregistration?user=" + req.body.firstname);
  });
});


module.exports = router;
