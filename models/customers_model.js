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





// Customers schema
const customers_schema = new mongoose.Schema({
    
    _id: { type: Number },
    CustomerId: { type: Number },
    CustFirstName: { type: String },
    CustLastName: { type: String },
    CustAddress: { type: String },
    CustCity: { type: String },
    CustProv: { type: String },
    CustPostal: { type: String },
    CustCountry: { type: String },
    CustHomePhone: { type: String },
    CustBusPhone: { type: String },
    CustEmail: { type: String },
    AgentId: { type: Number }
},
    { collection: "customers" })


// Booking details schema
const booking_details_schema = new mongoose.Schema({
    
    _id: { type: Number },
    BookingDetailId: { type: Number },
    ItineraryNo: { type: Number },
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
    ProductSupplierId: { type: Number }

},
    { collection: "bookingdetails" })




customers_schema.plugin(uniqueValidator)
booking_details_schema.plugin(uniqueValidator)

module.exports.CustomersModel = mongoose.model("CustomersModel", customers_schema)
module.exports.BookingDetailsModel = mongoose.model("BookingDetailsModel", booking_details_schema)