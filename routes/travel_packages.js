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

module.exports = router;