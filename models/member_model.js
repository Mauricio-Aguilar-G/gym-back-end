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
        w: { type: String},
        lastupdate: { type: Date, default: Date.now}
    },
    height:{
        h: { type: String},
        lastupdate: { type: Date, default: Date.now}
    },
    membership:{
        type: Number,default: 30
    },
    status:{
        type:Boolean,default:true
    }
});

module.exports = mongoose.model('Member', memberSchema);