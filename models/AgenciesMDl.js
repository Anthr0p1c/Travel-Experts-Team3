/*
* Sujani Wijesundera
CPRG008
Schema builld model for agencies table.
*/


const mongoose = require("mongoose");
//const uniqueValidator = require("mongoose-unique-validator");


//Create Agencies schema
const agencySchema = new mongoose.Schema({

    _id: {
        type: Number,
        required: true,
        trim: true
    },
    AgencyId: {
        type: String,
        required: true,
        trim: true
    },
    AgncyAddress: {
        type: String,
        required: true,
        trim: true
    },
    AgncyCity: {
        type: String,
        required: true,
        trim: true
    },
    AgncyProv: {
        type: String,
        required: true,
        trim: true
    },
    AgncyPostal: {
        type: String,
        required: true,
        trim: true
    },
    AgncyCountry: {
        type: String,
        required: true,
        trim: true
    },
    AgncyPhone: {
        type: String,
        required: true,
        trim: true
    },
    AgncyFax: {
        type: String,
        required: true,
        trim: true
    },
    AgencyEmail: {
        type: String,
        required: false,
        trim: true
    },


});


module.exports.Agency = mongoose.model('agencies', agencySchema);
