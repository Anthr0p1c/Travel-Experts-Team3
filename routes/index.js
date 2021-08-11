/*
Sujani
2021/07/25
PROG-009
*/

var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const RegisterCust = require("../models/postRegisterMdl").RegisterCust
var mongoose = require('mongoose');

const TravelPackagesModel = require("../models/travel_packages_model").TravelPackagesModel
const ProductModel = require("../models/travel_packages_model").ProductModel
const BookingModel = require("../models/travel_packages_model").BookingModel
const BookingDetailsModel = require("../models/travel_packages_model").BookingDetailModel




/* GET home page. */
// router.get('/', function (req, res, next) {
//    var currentUser = res.locals.currentUser
//    res.render('index', { title: 'Travel Experts', userName: currentUser })
// })




//Dispaly all packages
router.get('/', function (req, res, next) {
   console.log("inside index");
   var currentUser = res.locals.currentUser
   console.log("inside index1" + currentUser);
   TravelPackagesModel.find((err, posts) => {
      console.log("inside index2");
      res.render('index', { displayTravelPacks: posts, userName: currentUser });
   });
});


//Sujani added - detail view of selected package.
router.get('/displaydetails', function (req, res, next) {

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
            console.log(result);
            res.render('packagedetails', { title: 'Package Details', package: result, prodlist: products });
         });
      }
   });

});

//Sujani Added- Dispaly Buying page - customer can enter trip dates, travellers etc
router.post('/buyingdisplay', function (req, res, next) {

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
//If trip start and ends dates are not within the package start and end dates redirect to the same page with error message.
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

   var strToDateTripStart = new Date(TripStart);
   var strToDatePackageStart = new Date(PkgStartDate);

   var strToDateTripEnd = new Date(TripEnd);
   var strToDatePackageEnd = new Date(PkgEndDate);

   if ((strToDateTripStart <= strToDatePackageStart) || strToDateTripEnd > strToDatePackageEnd) {
      console.log("Send the error if trip start and end dates are not correct");
      res.render('displaybuyingpackage', { // redirect to the same page
         title: "Travel Package",
         PackageId: PackageId,
         PkgName: PkgName,
         PkgStartDate: PkgStartDate,
         PkgEndDate: PkgEndDate,
         PkgDesc: PkgDesc,
         PkgBasePrice: PkgBasePrice,
         prodlist: prodlist,
         errorFlag: "Trip start date or trip end date  not occured in the the range of package start date and package end date!"
      });

   }
   else { // send to the payment page 
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
   }
});



//Sujani Added- send cart details to the DB and redirect to the thank you page
router.post('/paymentprocess', function (req, res, next) {
   console.log("Add Payemt process************");
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
   // var strToDateTripStart = new Date(TripStart);
   // var strToDatePackageStart = new Date(PkgStartDate);

   // if (strToDateTripStart <= strToDatePackageStart) {
   //    console.log("ok*************");

   // }

   //else {
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
   // }
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
   //*********** */
   booking.TripStart = TripStart;
   booking.TripEnd = TripEnd;
   booking.Description = PkgDesc;
   booking.CancelFlag = "0"; //intial stage. Before cancelling the package



   booking.save((err, result) => {
      if (err) {

         const errorArray = [];
         const errorKeys = Object.keys(err.errors);
         errorKeys.forEach(key => errorArray.push(err.errors[key].message));
         return res.render("booking error", {
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
   bookingDetail.CustomerId = parseInt(CustomerId);
   bookingDetail.link = "testing";
   bookingDetail.CancelFlag = "0";//intial stage. Before cancelling the package


   bookingDetail.save((err, result1) => {
      if (err) {
         console.log("err bookingDetail", err);
         const errorArray = [];
         const errorKeys = Object.keys(err.errors);
         errorKeys.forEach(key => errorArray.push(err.errors[key].message));
         return res.render("error", {
            errors: errorArray
         });
      }
      res.render('suceesspayment', { title: "PaymentSucess", BookingId: bookingId, bookingNumber: bookingNumber });
   });

});

//Sujani Added - Dispaly all customer's packages
router.get('/ViewMyPackages', function (req, res, next) {

   if (req.user) {// if user login
      var MyPackages = [];
      var MyPackagesDetails = [];
      var customerId = req.user.CustomerId;

      BookingModel.find({ CustomerId: customerId }, function (err, result) {
         if (err) {
            console.log(err);
         } else {
            BookingDetailsModel.find({ CustomerId: customerId }, function (err, result1) {
               if (err) {
                  console.log(err);
               } else {
                  res.render('ViewMyPackages', { title: 'My Package Details', MyPackages: result, MyPackagesDetails: result1 });

               }
            });

         }
      });

   }
   else {
      res.render('ViewMyPackages', { title: 'My Package Details', flag: "Please Login Before View your Packages." });
   }

});


//Sujani Added - Customer cancel own packages. Validate the trip start date is already passed.
router.post('/cancelpackage', function (req, res, next) {

   var startDate = req.body.TripStart;
   var fDate = req.body.formatDate;
   var strToDateF = new Date(fDate);

   let date_ob = new Date();
   console.log("today date " + date_ob);
   var strToDate = new Date(startDate);

   if (strToDate <= date_ob) {
      console.log("ok");
      res.render('CancelResponse', { title: 'My Package Details', flag: "Sorry, the package cannot be canceled as your package start date already passed." });
   }
   else {

      if (strToDateF <= date_ob) {
         console.log("ok1");

      }
      var bbId = req.body.BookingId;

      BookingModel.findOne({ BookingId: parseInt((req.body.BookingId)) }, function (err, foundObject) {
         console.log("cc");
         if (err) {

            processErrors(err, req, res, CancelResponse)
         }
         else {
            foundObject.CancelFlag = "1";

            foundObject.save(function (err, updateObject) {
               if (err) {
                  //processErrors(err, 'error', req, res)
                  console.log(err);
               }
               else {
                  res.render('CancelResponse', { title: 'My Package Details', flag: "Your Package Cancellation Success!" });
               }
            })

         }

      });
   }//big else end
});


//Errors stores in the array and show in the front end when error occurs
function processErrors(errs, req, res, template) {
   // If there are errors from the Model schema
   const errorArray = [];
   const errorKeys = Object.keys(errs.errors);
   errorKeys.forEach((key) => errorArray.push(errs.errors[key].message));
   return res.render(template, {
      errors: errorArray,
   });
}

module.exports = router;