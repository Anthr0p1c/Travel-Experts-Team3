/*
David Grant
2021/07/25
PROJ-009
*/

// Connect to mongo cloud database
const MongoClient = require('mongodb');
const uri = "mongodb+srv://Anthropic:Rpu81opvi@cluster0.4annu.mongodb.net/travelexperts?retryWrites=true&w=majority";
const mongoose = require('mongoose');
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});

// Unique validator to check form
const uniqueValidator = require("mongoose-unique-validator");

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

travel_packages_schema.plugin(uniqueValidator)

module.exports.TravelPackagesModel = mongoose.model("TravelPackagesModel", travel_packages_schema)