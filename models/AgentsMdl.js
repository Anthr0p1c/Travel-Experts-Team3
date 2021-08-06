/*
* Sujani Wijesundera
CPRG008
Schema builld model for Agents.
*/


const mongoose = require("mongoose");
//const uniqueValidator = require("mongoose-unique-validator");

//Create Agencies schema
const agentsSchema = new mongoose.Schema({

    _id: {
        type: Number,
        required: true,
        trim: true
    },
    AgentId: {
        type: Number,
        required: true,
        trim: true
    },
    AgtFirstName: {
        type: String,
        required: true,
        trim: true
    },
    AgtMiddleInitial: {
        type: String,
        required: false,
        trim: true
    },
    AgtLastName: {
        type: String,
        required: false,
        trim: true
    },
    AgtBusPhone: {
        type: String,
        required: false,
        trim: true
    },
    AgtEmail: {
        type: String,
        required: true,
        trim: true
    },
    AgtPosition: {
        type: String,
        required: true,
        trim: true
    },
    AgencyId: {
        type: Number,
        required: true,
        trim: true
    },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "agencies" },

});


module.exports.Agent = mongoose.model('agents', agentsSchema);
