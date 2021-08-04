/*
* Author: Sujani Wijesundera
CPRG-008
Creating and validating the schema for user registration.
Validate email is unique and password is in the reqired format
*/

// Require the mongoose module
var mongoose = require('mongoose');
const { init } = require('../app');

//Unique validator
const uniqueValidator = require("mongoose-unique-validator");


var lengthValidator = function (val) {
    if (val && val.length >= 5) {
        return true;
    }
    return false;
};

const postSchema = new mongoose.Schema({

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
    CustFirstName: {
        type: String,
        required: "Please enter the firstName.",
        trim: true
    },
    CustLastName: {
        type: String,
        required: "Please enter the firstName.",
        trim: true
    },
    CustEmail: {
        type: String,
        required: "Please enter the email.",
        trim: true,
        unique: true

    },
    // Password format and regex error checking
    CustPassword: {
        type: String,
        required: "Please enter your password.",
        trim: true,
        validate: {
            validator: function (v) {
                return /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])/.test(v)
            },
            message: props => `${props.value} Passwords require one uppercase, one lowercase, and one special character !@#$%^*.`
        }
    },

    CustAddress: {
        type: String,
        required: "Please enter the address",
        trim: true
    },
    CustCity: {
        type: String,
        required: false,
        trim: true
    },
    CustProv: {
        type: String,
        required: false,
        trim: true
    },
    CustCountry: {
        type: String,
        required: false,
        trim: true
    },
    CustPostal: {
        type: String,
        required: false,
        trim: true
    },
    CustHomePhone: {
        type: String,
        required: false,
        trim: true
    },
    CustHomePhone: {
        type: String,
        required: false,
        trim: true
    },
    CustBusPhone: {
        type: String,
        required: false,
        trim: true
    },
    role: {
        type: String,
        required: false,
        trim: true
    },
    AgentId: {
        type: Number,
        required: false,
        trim: true
    },


});

/**
 * Validates unique email
 */
postSchema.path('CustEmail').validate(async (CustEmail) => {
    const emailCount = await mongoose.models.customers.countDocuments({ CustEmail })
    return !emailCount
}, "Your Email address already exists. Please Login")


// Run schema through validator to check the password format
postSchema.plugin(uniqueValidator)

module.exports.Post = mongoose.model('customers', postSchema);
