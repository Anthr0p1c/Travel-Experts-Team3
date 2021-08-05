/*
David Grant
2021/07/25
PROJ-009
*/

// Includes Travel packages, Regions, Trip type, Classes, and Fees schemas pulled from mongodb cloud

// Require the mongoose module (added bysujani)
var mongoose = require('mongoose');


// Connect to mongo cloud database

//commented by sujani
// const MongoClient = require('mongodb');
// const uri = "mongodb+srv://Anthropic:Rpu81opvi@cluster0.4annu.mongodb.net/travelexperts?retryWrites=true&w=majority";
// const mongoose = require('mongoose');
// mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {});

// Unique validator to check form
const uniqueValidator = require("mongoose-unique-validator");



// Travel packages schema
const travel_packages_schema = new mongoose.Schema({

    _id: { type: Number },
    PackageId: { type: Number },
    PkgName: { type: String },
    PkgStartDate: { type: Date },
    PkgEndDate: { type: Date },
    PkgDesc: { type: String },
    PkgBasePrice: { type: Number },
    PkgAgencyCommission: { type: Number }
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



travel_packages_schema.plugin(uniqueValidator)
regions_schema.plugin(uniqueValidator)
trip_type_schema.plugin(uniqueValidator)
classes_schema.plugin(uniqueValidator)
fees_schema.plugin(uniqueValidator)
suppliers_schema.plugin(uniqueValidator)

product_schema.plugin(uniqueValidator)


module.exports.TravelPackagesModel = mongoose.model("TravelPackagesModel", travel_packages_schema)
module.exports.RegionsModel = mongoose.model("RegionsModel", regions_schema)
module.exports.TripTypeModel = mongoose.model("TripTypeModel", trip_type_schema)
module.exports.ClassesModel = mongoose.model("ClassesModel", classes_schema)
module.exports.FeesModel = mongoose.model("FeesModel", fees_schema)
module.exports.SupplierModel = mongoose.model("SupplierModel", suppliers_schema)

module.exports.ProductModel = mongoose.model("ProductModel", product_schema)
//console.log("&&&&&");