const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Enforce 8-character minimum for passwords
function validatePassword(password, cb) {
    if (password.length >= 8) {
        return cb(null);
    } else {
        return cb(new Error(`Password must be at least 8 characters long.`));
    }
}

// Database schema for producer accounts
let producerAccountSchema = new mongoose.Schema({
    businessName: String,
    address: String,
    postalCode: String,
    city: String,
    state: String,
    username: String,
    password: String
});
producerAccountSchema.plugin(passportLocalMongoose, {
    passwordValidator: validatePassword
});

let ProducerAccount = mongoose.model('ProducerAccount', producerAccountSchema);


module.exports.ProducerAccount = ProducerAccount;
