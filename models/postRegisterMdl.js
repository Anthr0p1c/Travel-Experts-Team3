/*
David Grant
Sujani Wijesundera
2021/07/25
CPRG-008
Assignment 2
*/

// Connect to mongo cloud database


'use strict';

var mongoose = require('mongoose')




// Mongoose schema
const registerSchema = new mongoose.Schema({

    _id: {
        type: Number,
        required: true,
        trim: true
    },
    CustomerId: {
        type: String,
        required: true,
        trim: true
    },

    // First name
    CustFirstName: {
        type: String,
    },

    // Last name
    CustLastName: {
        type: String,
    },

    // Address format and error checking
    CustAddress: {
        type: String,
    },

    CustCity: String,
    CustProv: String,

    // Postal code format and error checking
    CustPostal: {
        type: String,
    },
    CustCountry: String, 
    CustHomePhone: String,
    CustBusPhone: String,

    // Email format and regex error checking
    CustEmail: {
        type: String,
    },
    
    AgentId: {
        type: Number,
    },
    
    // Password format and regex error checking
    password: {
        type: String,
    },

})



// Export module as mongoose model
module.exports.RegisterCust = mongoose.model("RegisterCust", registerSchema)
