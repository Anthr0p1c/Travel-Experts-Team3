/*
David Grant
2021/07/25
PROJ-009
*/

// Includes Travel packages, Regions, Trip type, Classes, and Fees schemas pulled from mongodb cloud

// Require the mongoose module (added bysujani)
var mongoose = require('mongoose');


// Connect to mongo cloud database

// Unique validator to check form
const uniqueValidator = require("mongoose-unique-validator");



// Travel packages schema - SujaniAdded
const travel_packages_schema = new mongoose.Schema({

    _id: { type: Number },
    PackageId: { type: Number },
    PkgName: { type: String },
    PkgStartDate: {
        type: Date,
        validate: {
            validator: function (selectDate, packageStartDate) {
                return selectDate >= packageStartDate;
            },
            message: props => `Selected Start Date Can't be Less than the Package Start Date.`
        }

    },
    PkgEndDate: {
        type: Date,
        validate: {
            validator: function (selectDate, packageEndDate) {
                return selectDate <= packageStartDate;
            },
            message: props => `Selected End Date Can't be Less than the Package End Date.`
        }
    },
    PkgDesc: { type: String },
    PkgBasePrice: { type: Number },
    PkgAgencyCommission: { type: Number },
    Img: { type: String },
    LongDesc: { type: String }
},
    { collection: "packages" })


// Regions schema
const regions_schema = new mongoose.Schema({

    _id: { type: String },
    RegionId: { type: String },
    RegionName: { type: String },
},
    { collection: "regions" })


// Trip types schema
const trip_type_schema = new mongoose.Schema({

    _id: { type: String },
    TripTypeId: { type: String },
    TTName: { type: String },
},
    { collection: "triptypes" })


// Classes schema
const classes_schema = new mongoose.Schema({

    _id: { type: String },
    ClassId: { type: String },
    ClassName: { type: String },
    ClassDesc: { type: String }
},
    { collection: "classes" })


// Fees schema
const fees_schema = new mongoose.Schema({

    _id: { type: String },
    FeeId: { type: String },
    FeeName: { type: String },
    FeeAmt: { type: Number },
    FeeDesc: { type: String }
},
    { collection: "fees" })


// Suppliers schema
const suppliers_schema = new mongoose.Schema({

    _id: { type: Number },
    SupplierId: { type: Number },
    SupName: { type: String },
},
    { collection: "suppliers" })

//Sujani added - Product schema
// Suppliers schema
const product_schema = new mongoose.Schema({

    _id: { type: Number },
    ProductId: { type: Number },
    ProdName: { type: String },
},
    { collection: "products" })

//Sujani added - Product schema
// Suppliers schema
const bookings_schema = new mongoose.Schema({

    _id: { type: Number },
    BookingId: { type: Number },
    BookingDate: { type: Date },
    BookingNo: { type: String },
    TravelerCount: { type: Number },
    CustomerId: { type: Number },
    TripTypeId: { type: String },
    PackageId: { type: Number },
},
    { collection: "bookings" })

const bookings_detail_schema = new mongoose.Schema({

    _id: { type: Number },
    BookingDetailId: { type: Number },
    ItineraryNo: { type: Number },
    BookingNo: { type: String },
    TripStart: { type: Date },
    TripEnd: { type: Date },
    Description: { type: String },
    Destination: { type: String },
    BasePrice: { type: Number },
    AgencyCommission: { type: Number },
    BookingId: { type: Number },
    RegionId: { type: String },
    ClassId: { type: String },
    FeeId: { type: String },
    ProductSupplierId: { type: Number },


},
    { collection: "bookingdetails" })




travel_packages_schema.plugin(uniqueValidator)
regions_schema.plugin(uniqueValidator)
trip_type_schema.plugin(uniqueValidator)
classes_schema.plugin(uniqueValidator)
fees_schema.plugin(uniqueValidator)
suppliers_schema.plugin(uniqueValidator)

product_schema.plugin(uniqueValidator)
bookings_schema.plugin(uniqueValidator)
bookings_detail_schema.plugin(uniqueValidator)


module.exports.TravelPackagesModel = mongoose.model("TravelPackagesModel", travel_packages_schema)
module.exports.RegionsModel = mongoose.model("RegionsModel", regions_schema)
module.exports.TripTypeModel = mongoose.model("TripTypeModel", trip_type_schema)
module.exports.ClassesModel = mongoose.model("ClassesModel", classes_schema)
module.exports.FeesModel = mongoose.model("FeesModel", fees_schema)
module.exports.SupplierModel = mongoose.model("SupplierModel", suppliers_schema)

module.exports.ProductModel = mongoose.model("ProductModel", product_schema)
module.exports.BookingModel = mongoose.model("BookingModel", bookings_schema)
module.exports.BookingDetailModel = mongoose.model("BookingDetailModel", bookings_detail_schema)

//console.log("&&&&&");