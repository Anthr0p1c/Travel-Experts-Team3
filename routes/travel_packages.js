/*
David 
Sujani
2021/07/25
PROG-009
*/

var express = require('express');
var router = express.Router();


const TravelPackagesModel = require("../models/travel_packages_model").TravelPackagesModel
const ProductModel = require("../models/travel_packages_model").ProductModel
const BookingModel = require("../models/travel_packages_model").BookingModel
const BookingDetailsModel = require("../models/travel_packages_model").BookingDetailModel

//Dispaly all packages
router.get('/', function (req, res, next) {
   TravelPackagesModel.find((err, posts) => {
      res.render('travel_packages', { displayTravelPacks: posts });
   });
});


//Sujani added - detail view of packages.
router.get('/displaydetails', function (req, res, next) {
   //console.log("inside displaydetais" + req.query.PackageId);
   var PackageId = req.query.PackageId;
   var app = express();
   app.locals.PackageId = PackageId;

   PackageId = parseInt(PackageId);
   TravelPackagesModel.findOne({ PackageId: PackageId }, function (err, result) {
      if (err) {
         console.log(err);
      } else {
         ProductModel.find((err, products) => {
            prodlist: products

            res.render('packagedetails', { title: 'Package Details', package: result, prodlist: products });
         });
      }
   });

});

//Sujani Added- Dispaly Buying page
router.post('/buyingdisplay', function (req, res, next) {
   //TravelPackagesModel.find((err, posts) => {
   // res.render('displaybuyingpackage', { title: "Travel Package" });
   //});
   var PackageId = req.body.PackageId;
   var PkgName = req.body.PkgName;
   var PkgEndDate = req.body.PkgEndDate;
   var PkgStartDate = req.body.PkgStartDate;
   var PkgDesc = req.body.PkgDesc;
   var PkgBasePrice = req.body.PkgBasePrice;
   var prodlist = req.body.prodlist;

   res.render('displaybuyingpackage', {
      title: "Travel Package",
      PackageId: PackageId,
      PkgName: PkgName,
      PkgStartDate: PkgStartDate,
      PkgEndDate: PkgEndDate,
      PkgDesc: PkgDesc,
      PkgBasePrice: PkgBasePrice,
      prodlist: prodlist,

   });

});

//Sujani Added- send cart details to the creditcard page
router.post('/gocart', function (req, res, next) {
   var CustomerId = req.body.CustomerId;
   var PackageId = req.body.PackageId;
   var PkgName = req.body.PkgName;
   var PkgEndDate = req.body.PkgEndDate;
   var PkgStartDate = req.body.PkgStartDate;
   var PkgDesc = req.body.PkgDesc;
   var PkgBasePrice = req.body.PkgBasePrice;
   var TripStart = req.body.TripStart;
   var TripEnd = req.body.TripEnd;
   var TravelerCount = req.body.TravelerCount;

   var TravelerCountC = req.body.TravelerCountC;

   TravelerCount = parseInt(TravelerCount) + parseInt(TravelerCountC);

   var TripTypeId = req.body.TripTypeId;
   var ClassId = req.body.ClassId;
   var ProductId = req.body.ProductId;
   var FeeId = req.body.FeeId;
   var RegionId = req.body.RegionId;

   var prodlist = req.body.prodlist;

   res.render('payment', {
      title: "Travel Package",
      PackageId: PackageId,
      CustomerId: CustomerId,
      PkgName: PkgName,
      PkgStartDate: PkgStartDate,
      PkgEndDate: PkgEndDate,
      PkgDesc: PkgDesc,
      PkgBasePrice: PkgBasePrice,
      TripStart: TripStart,
      TripEnd: TripEnd,
      TravelerCount: TravelerCount,
      TripTypeId: TripTypeId,
      ClassId: ClassId,
      ProductId, ProductId,
      FeeId: FeeId,
      RegionId: RegionId,

   });
});



//Sujani Added- send cart details to the DB and redirect to the thank you page
router.post('/paymentprocess', function (req, res, next) {
   var PackageId = req.body.PackageId;
   var PkgName = req.body.PkgName;
   var PkgEndDate = req.body.PkgEndDate;
   var PkgStartDate = req.body.PkgStartDate;
   var PkgDesc = req.body.PkgDesc;
   var PkgBasePrice = req.body.PkgBasePrice;
   var TripStart = req.body.TripStart;
   var TripEnd = req.body.TripEnd;
   var TravelerCount = req.body.TravelerCount;
   var TripTypeId = req.body.TripTypeId;
   var ClassId = req.body.ClassId;
   var ProductId = req.body.ProductId;
   var FeeId = req.body.FeeId;
   var RegionId = req.body.RegionId;

   var prodlist = req.body.prodlist;

   res.render('payment', {
      title: "Travel Package",
      PackageId: PackageId,
      PkgName: PkgName,
      PkgStartDate: PkgStartDate,
      PkgEndDate: PkgEndDate,
      PkgDesc: PkgDesc,
      PkgBasePrice: PkgBasePrice,
      TripStart: TripStart,
      TripEnd: TripEnd,
      TravelerCount: TravelerCount,
      TripTypeId: TripTypeId,
      ClassId: ClassId,
      ProductId, ProductId,
      FeeId: FeeId,
      RegionId: RegionId,

   });

});


//Sujani Added- Buying process complete and update the DB, Booking details and Booking tables

router.post('/buypackagecomplete', function (req, res, next) {
   var PackageId = req.body.PackageId;
   var PkgName = req.body.PkgName;
   var PkgEndDate = req.body.PkgEndDate;
   var PkgStartDate = req.body.PkgStartDate;
   var PkgDesc = req.body.PkgDesc;
   var PkgBasePrice = req.body.PkgBasePrice;
   PkgBasePrice = parseInt(PkgBasePrice);
   var TripStart = req.body.TripStart;
   var TripEnd = req.body.TripEnd;
   var TravelerCount = req.body.TravelerCount;
   var TripTypeId = req.body.TripTypeId;
   var classId = req.body.ClassId;
   var ProductId = req.body.ProductId;
   var FeeId = req.body.FeeId;
   var RegionId = req.body.RegionId;
   var CustomerId = req.body.CustomerId;

   const bookingId = Math.floor(Math.random() * 100000);
   const bookingDetailId = Math.floor(Math.random() * 10000);
   const bookingNumber = Math.random().toString(36).substr(2, 5).toUpperCase();

   const booking = new BookingModel();

   booking._id = bookingId;
   booking.BookingId = bookingId;
   booking.BookingDate = new Date();
   booking.BookingNo = bookingNumber;
   booking.TravelerCount = TravelerCount;

   booking.CustomerId = parseInt(CustomerId);
   booking.TripTypeId = TripTypeId;
   booking.PackageId = PackageId;


   booking.save((err, result) => {
      if (err) {
         console.log("Error", err);
         const errorArray = [];
         const errorKeys = Object.keys(err.errors);
         errorKeys.forEach(key => errorArray.push(err.errors[key].message));
         return res.render("booking error", {
            //postdata: req.body, // to display entered values in text boxes when error occur.
            errors: errorArray
         });
      }
   });

   const bookingDetail = new BookingDetailsModel();

   bookingDetail._id = bookingId;
   bookingDetail.BookingId = bookingId;
   bookingDetail.ItineraryNo = bookingId;
   bookingDetail.TripStart = TripStart;
   bookingDetail.TripEnd = TripEnd;
   bookingDetail.Description = PkgDesc;
   bookingDetail.Destination = PkgDesc;
   bookingDetail.BasePrice = PkgBasePrice;
   bookingDetail.BasePrice = PkgBasePrice;
   bookingDetail.AgencyCommission = 0;
   bookingDetail.BookingId = bookingId;
   bookingDetail.RegionId = RegionId;
   bookingDetail.ClassId = classId;
   bookingDetail.FeeId = FeeId;
   bookingDetail.ProductSupplierId = ProductId;


   bookingDetail.save((err, result1) => {
      if (err) {
         console.log("err bookingDetail", err);
         const errorArray = [];
         const errorKeys = Object.keys(err.errors);
         errorKeys.forEach(key => errorArray.push(err.errors[key].message));
         return res.render("error", {
            //postdata: req.body, // to display entered values in text boxes when error occur.
            errors: errorArray
         });
      }
      res.render('suceesspayment', { title: "PaymentSucess" });
   });

   //res.render("suceesspayment"); // Redirect to thank you page




});

module.exports = router;