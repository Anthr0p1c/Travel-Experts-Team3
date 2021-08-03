/*
Author: Sujani Wijesunder
Date:02/08/20201
 */

var express = require('express');
var router = express.Router();
const Post = require('../models/postcontactusMdl').Post;
const { Agency } = require("../models/AgenciesMDl");
const { Agent } = require("../models/AgentsMdl");
var custId = 0; // to add a unique id to DB when message added to the DB
var i = 0;


router.get('/show', function (req, res, next) {
    console.log("%%%%%%%%%");
    var arrayCalgary1 = [];
    var arrayOkotus1 = [];

    Agency.find({}, (err, agencies) => {
        //console.log("%%%%%%%%% 1");
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
                        arrayCalgary1.push(item);
                    }
                    if (item.AgencyId == 2) {
                        arrayOkotus1.push(item);
                    }
                });

                //res.render('contactuser', { custName: custname, title: 'usermessage', myCustomers: result });
                res.render('DisplayAgents', {
                    title: "Agents",
                    //agencies: agencies,
                    agentcalgary: arrayCalgary1,
                    agentokotos: arrayOkotus1,
                    pnfound: "Page404.html",
                    imgPath: "/img/Logo.jpg"
                });
            }
        });


    });

});

// Show the update contactus form to update contacts
// router.get('/showcontacts', function (req, res, next) {
//     console.log("%%%%%%%%%");
//     var arrayCalgary1 = [];
//     var arrayOkotus1 = [];

//     Agency.find({}, (err, agencies) => {
//         //console.log("%%%%%%%%% 1");
//         //   var agentresult = getAgents(i, agencies, req, res, next)
//         //  i= i+1;
//         //  var agentresult1 = getAgents(i, agencies, req, res, next)

//         // Agent.find({ AgencyId: agencies[i].AgencyId }, function (err, result) {
//         Agent.find({}, function (err, result) {
//             if (err) {
//                 console.log(err);
//             } else {

//                 result.forEach(function (item) {
//                     if (item.AgencyId == 1) {
//                         arrayCalgary1.push(item);
//                     }
//                     if (item.AgencyId == 2) {
//                         arrayOkotus1.push(item);
//                     }
//                 });

//                 //res.render('contactuser', { custName: custname, title: 'usermessage', myCustomers: result });
//                 res.render('contactusupdate', {
//                     title: "ContactUs",
//                     agencies: agencies,
//                     agentcalgary: arrayCalgary1,
//                     agentokotos: arrayOkotus1,
//                     pnfound: "Page404.html",
//                     imgPath: "/img/Logo.jpg"
//                 });
//             }
//         });


//     });

// });

router.post('/editcontact/', function (req, res, next) {
    console.log("inside contact udate");

    var AgentId = req.body.AgentId;
    console.log("inside contact AgentId** " + AgentId);
    // console.log(req.body);
    res.render('contactupdateme', {
        //     title: "contactupdateme"
        //     //agentname: CustFirstName

    });
});



module.exports = router;