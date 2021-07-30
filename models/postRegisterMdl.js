// Require the mongoose module
var mongoose = require('mongoose');
const { init } = require('../app');
// Set up a mongoose connection

//var Schema = mongoose.Schema;

//Local host 
//var mongoDB = 'mongodb://localhost:27017/travelexperts';


//Mostafa's connection to cluster db
//var mongoDB = "mongodb+srv://mongo_user:ss123@cluster0.tuddo.mongodb.net/blog?retryWrites=true&w=majority";

//my connection cluster db - team travel
var mongoDB = "mongodb+srv://Sujani:Sujani123@cluster0.4annu.mongodb.net/travelexperts?retryWrites=true&w=majority";

//Travelexperts - my cluster
//var mongoDB = "mongodb+srv://Ilup75:Ilup75@cluster0.zigid.mongodb.net/travelexperts?retryWrites=true&w=majority";


mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.set('useCreateIndex', true);

// Get the connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
    console.log("we're connected!")
});



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


});

/**
 * Validates unique email
 */
postSchema.path('CustEmail').validate(async (CustEmail) => {
    const emailCount = await mongoose.models.customers.countDocuments({ CustEmail })
    return !emailCount
}, "Your Email address already exists. Please Login")



module.exports.Post = mongoose.model('customers', postSchema);
