/*
Author: Sujani Wijesunder
Date:02/08/20201
Display and facilitate update contacts.
 */

var express = require('express');
var router = express.Router();
const Post = require('../models/postcontactusMdl').Post;
const { Agency } = require("../models/AgenciesMDl");
const { Agent } = require("../models/AgentsMdl");
var custId = 0; // to add a unique id to DB when message added to the DB
var i = 0;


//Display all agents
router.get('/show', function (req, res, next) {

    var arrayCalgary1 = [];
    var arrayOkotus1 = [];

    Agency.find({}, (err, agencies) => {
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


// Process the edit Agent- update in the database and redirect to thank you page or error page
router.post("/updateagent", function (req, res, next) {
    console.log("Update contact************");
    // const data = req.body;
    // console.log("Update contact************1" + req.body.AgtFirstName);
    // console.log("Update contact************1" + req.body.AgtLastName);
    // console.log("Update contact************1" + req.body.AgtMiddleInitial);
    // console.log("Update contact************1" + req.body.AgtBusPhone);
    // console.log("Update contact************1" + req.body.AgtEmail);
    // console.log("Update contact************1" + req.body._id);
    // console.log("Update contact************1* " + req.body.AgtPosition);
    // console.log("Update contact************1# " + req.body.AgencyId);
    // console.log("Update contact************@@!! " + req.body.AgentId);
    var agentId1 = req.body.AgentId;
    var Id1 = parseInt(req.body._id);
    console.log("agentId^^ " + agentId1)
    var agentId = parseInt(agentId1);
    var firstName = req.body.AgtFirstName;
    Agent.findOne({ AgentId: agentId }, function (err, foundObject) {

        if (err) {
            processErrors(err, 'error', req, res)
        }
        else {
            //foundObject.AgentId = agentId;
            foundObject.AgtFirstName = firstName;
            foundObject.AgtLastName = req.body.AgtLastName;
            foundObject.AgtMiddleInitial = req.body.AgtMiddleInitial;
            foundObject.AgtBusPhone = req.body.AgtBusPhone;
            foundObject.AgtEmail = req.body.AgtEmail;
            foundObject.AgtPosition = req.body.AgtPosition;

            foundObject.save(function (err, updateObject) {
                if (err) {
                    processErrors(err, 'error', req, res)
                }
                else {
                    res.redirect("/update/showsuccessmessage?firstname=" + firstName);

                }
            })

        }

    });

});

/* GET Thank you message after updating agent info. */
router.get('/showsuccessmessage', function (req, res, next) {
    const firstName = req.query.firstname;
    res.send('<br><br><b><center>Records of <font style=color:blue;>' + firstName + '</font>,&nbsp;Successfully updated!<br><br><a href="show">Back To Edit Agents</a><br><br><a href="/">Home</a></center></b>');
});


//display agent profile to edit
router.post('/editcontact/', function (req, res, next) {
    console.log("inside contact udate");

    var AgentId = req.body.AgentId;
    var agentFName = req.body.AgtFirstName;

    res.render('contactupdateme', {
        title: "contactupdate",
        AgentId: AgentId,
        agentFirstName: agentFName,
        AgtLastName: req.body.AgtLastName,
        AgtMiddleInitial: req.body.AgtMiddleInitial,
        AgtBusPhone: req.body.AgtBusPhone,
        AgtEmail: req.body.AgtEmail,
        AgtPosition: req.body.AgtPosition,
        AgencyId: req.body.AgencyId

    });
});

//display agent dashboard
router.get('/showdashboard', function (req, res, next) {
    res.render("agentdashboard");
});

function processErrors(errs, pageTemplate, req, res) {
    // If there are errors from the Model schema
    const errorArray = [];
    const errorKeys = Object.keys(errs.errors);
    errorKeys.forEach((key) => errorArray.push(errs.errors[key].message));
    return res.render(pageTemplate, {
        errors: errorArray,
        ...req.body,
    });
}


module.exports = router;