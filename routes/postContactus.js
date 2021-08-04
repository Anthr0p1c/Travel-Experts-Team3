/*
Author: Sujani Wijesunder
Date:28/07/20201
 */

var express = require('express');
var router = express.Router();
const Post = require('../models/postcontactusMdl').Post;
const { Agency } = require("../models/AgenciesMDl");
const { Agent } = require("../models/AgentsMdl");
var custId = 0; // to add a unique id to DB when message added to the DB
var i = 0;

// Show the contactus form to submit a message and get all company office get from db, And listed all agents
router.get('/createcontact', function (req, res, next) {
    var arrayCalgary = [];
    var arrayOkotus = [];

    //find the maximum id and add one to it, to create a new unique id
    Post.find()
        .sort({ _id: -1 })
        .limit(1)
        .then(Post => {
            custId = Post[0]._id;
            custId = custId + 1;
        });

    Agency.find({}, (err, agencies) => {
        console.log(agencies[0].AgencyId);
        //   var agentresult = getAgents(i, agencies, req, res, next)
        //  i= i+1;
        //  var agentresult1 = getAgents(i, agencies, req, res, next)

        // Agent.find({ AgencyId: agencies[i].AgencyId }, function (err, result) {
        Agent.find({}, function (err, result) {
            if (err) {
                console.log(err);
            } else {

                result.forEach(function (item) {
                    if (item.AgencyId == 1) {
                        arrayCalgary.push(item);
                    }
                    if (item.AgencyId == 2) {
                        arrayOkotus.push(item);
                    }
                });

                //res.render('contactuser', { custName: custname, title: 'usermessage', myCustomers: result });
                res.render('contactus', {
                    title: "ContactUs",
                    agencies: agencies,
                    agentcalgary: arrayCalgary,
                    agentokotos: arrayOkotus,
                    pnfound: "Page404.html",
                    imgPath: "/img/Logo.jpg"
                });
            }
        });


    });

});

//Get agents from DB as per the agency
function getAgents(index, arr, req, res, next) {
    Agent.find({ AgencyId: arr[index].AgencyId }, function (err, result) {
        //Agent.find({}, function (err, result) {
        if (err) {
            console.log(err);
            return err;
        } else {
            console.log(result);
            return result;
        }
    });

}


// To create a new message and send DB
router.post('/createmessage', function (req, res, next) {

    const post = new Post();
    post._id = custId;
    post.CustomerId = custId.toString();
    post.CustFirstName = req.body.firstname;
    post.CustLastName = req.body.lastname;
    post.CustEmail = req.body.email;
    post.CustMessage = req.body.message;

    post.save(err => {
        // if(err) throw err;
        if (err) {
            const errorArray = [];
            const errorKeys = Object.keys(err.errors);
            errorKeys.forEach(key => errorArray.push(err.errors[key].message));
            return res.render("contactus", {
                errors: errorArray,
                postdata: req.body // send back data to the form
            });
        }
        res.redirect("/contact/addConatctusmessage?user=" + req.body.firstname);
    });

});


/* GET Thank you message. */
router.get('/addConatctusmessage', function (req, res, next) {
    const firstName = req.query.user;
    res.send('<br><br><b><center>Thank you <font style=color:blue;>' + firstName + '</font>, your message is recorded. We will get back to you soon!<br><br><a href="/">Home</a></center></b>');
});



// middleware that is specific to this router,
// checks that the user must be logged in
router.use((req, res, next) => {
    //console.log('Time: ', Date.now());
    if (!req.user) res.status(403).redirect("/");
    //else if (req.user.role != "agent") res.status(403).redirect("/");
    else next();
});


/* Display all custmer message . */
router.get('/contactmessages', function (req, res, next) {
    Post.find((err, posts) => {
        res.render('showallmessages', { messageList: posts });
    });
});


//when user click the first name render this page
router.get('/mycustdetails/:firstname', function (req, res, next) {
    var custname = req.params.firstname;
    Post.find({ CustFirstName: custname }, function (err, result) {
        if (err) {
            console.log(err);
        } else {

            res.render('contactuser', { custName: custname, title: 'usermessage', myCustomers: result });
        }
    });
});


module.exports = router;
