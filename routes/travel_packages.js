/*
David Grant
2021/07/25
PROG-009
*/

var express = require('express');
var router = express.Router();


const TravelPackagesModel = require("../models/travel_packages_model").TravelPackagesModel


router.get('/', function (req, res, next) {
   TravelPackagesModel.find((err, posts) => {
      res.render('travel_packages', { displayTravelPacks: posts });
   });
});

//Sujani added - detail display of packages.
router.get('/displaydetails', function (req, res, next) {
   //console.log("inside displaydetais" + req.query.PackageId);
   var PackageId = req.query.PackageId;
   PackageId = parseInt(PackageId);
   TravelPackagesModel.findOne({ PackageId: PackageId }, function (err, result) {
      if (err) {
         console.log(err);
      } else {
         res.render('packagedetails', { title: 'Package Details', package: result });
      }
   });

});


module.exports = router;