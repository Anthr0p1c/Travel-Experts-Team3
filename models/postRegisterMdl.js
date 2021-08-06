/*
David Grant
Sujani Wijesundera
2021/07/25
CPRG-008
Assignment 2
*/

// Connect to mongo cloud database
// const MongoClient = require('mongodb');
// const uri = "mongodb+srv://Anthropic:Rpu81opvi@cluster0.4annu.mongodb.net/registerCustomer?retryWrites=true&w=majority";
const mongoose = require('mongoose');
// mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
// });

// Unique validator to check form
const uniqueValidator = require("mongoose-unique-validator");

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
    
    // Email format and regex error checking
    email: {
        type: String,
        required: "Please enter your email.",
        trim: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
            },
            message: props => `${props.value} is not a valid email address.`
        }
    },

    // Password format and regex error checking
    password: {
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

    // First name
    fname: {
        type: String,
        required: "Please enter your first name.",
        trim: true,
        validate: {
            validator: function (v) {
                return v.length > 1
            },
            message: props => `${props.value} Name should be more than one character.`
        }
    },

    // Last name
    lname: {
        type: String,
        required: "Please enter your last name.",
        trim: true,
        validate: {
            validator: function (v) {
                return v.length > 1
            },
            message: props => `${props.value} Name should be more than one character.`
        }
    },

    // Address format and error checking
    address: {
        type: String,
        required: "Please enter your address.",
        trim: true,
        validate: {
            validator: function (v) {
                return /^\s*\S+(?:\s+\S+){2}/.test(v)
            },
            message: props => `${props.value} Invalid address.`
        }
    },

    // Postal code format and error checking
    postal: {
        type: String,
        required: "Please enter your postal code.",
        trim: true,
        validate: {
            validator: function (v) {
                return /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/.test(v)
            },
            message: props => `${props.value} Invalid postal code.`
        }
    },

    province: String,
    country: String, 

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
})

// Run schema through validator
registerSchema.plugin(uniqueValidator)

// Export module as mongoose model
module.exports.RegisterCust = mongoose.model("RegisterCust", registerSchema)
