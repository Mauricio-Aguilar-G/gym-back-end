const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name:{
        type: String, required: true
    },
    email:{
        type: String, required: true, min: 6, max:1024, unique: true
    },
    password:{
        type: String, required: true, minLength: 6
    }
});

module.exports = mongoose.model('Admin', adminSchema);