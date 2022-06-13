const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name:{
        type: String,required: true
    },
    age:{
        type: Number, min: 18, max: 65, required: true
    },
    number:{
        type: Number,required: true, unique: true
    },
    weight:{
        type: String
    },
    height:{
        type: String
    },
    membership:{
        type: Number,default: 30
    },
    status:{
        type:Boolean,default:true
    }
});

module.exports = mongoose.model('Member', memberSchema);