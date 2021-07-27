//Author:Sujani Wijesundera
var express = require('express');
var router = express.Router();
const Post = require('../models/postRegisterMdl').Post;
var custId = 0;


/* print user a message after registering. */
router.get('/addregistration', function (req, res, next) {
    const firstName = req.query.user;
    //console.log(query);
    res.send('<b><center>' + firstName + ' successfully Registered!</center></b>');
});


// Show the use registration form
router.get('/create', function (req, res, next) {
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




// To create a new post
router.post('/create', function (req, res, next) {
    //get the maximum _id and add one to create a new id
    Post.find()
        .sort({ _id: -1 })
        .limit(1)
        .then(Post => {
            custId = Post[0]._id;
        });

    const post = new Post();
    custId = custId + 1;
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
    //post.AgentId = req.body.agentid;

    post.save(err => {

        // if(err) throw err;
        if (err) {
            console.log("Error***");
            const errorArray = [];
            const errorKeys = Object.keys(err.errors);
            errorKeys.forEach(key => errorArray.push(err.errors[key].message));
            return res.render("register", {
                imgPath: "/img/Logo.jpg",
                errors: errorArray
            });
        }
        res.redirect("/post/addregistration?user=" + req.body.firstname);
    });
});


module.exports = router;
