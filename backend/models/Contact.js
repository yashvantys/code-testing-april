const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    country: String,
    phone: String,
    about: String,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
