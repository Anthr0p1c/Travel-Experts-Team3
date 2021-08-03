/**
 * Author:Sujani Wijesundera
 * Date:22/07/2021
 */

// Require the mongoose module
var mongoose = require('mongoose');
const { init } = require('../app');
//Unique validator
const uniqueValidator = require("mongoose-unique-validator");

//Create the schema for contactus form
const postSchemaContact = new mongoose.Schema({

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
        trim: true
    },
    CustMessage: {
        type: String,
        required: "Please enter the message",
        trim: true,
        validate: {
            validator: function (v) {
                return v.length > 5;
            },
            message: props => `Message is too short.`
        }
    },


});

postSchemaContact.plugin(uniqueValidator);
module.exports.Post = mongoose.model('contactus', postSchemaContact);
