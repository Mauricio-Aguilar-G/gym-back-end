const express = require('express');
const Joi = require('joi');
const route = express.Router();
const Member = require('../models/member_model');


// View member
route.get('/member/:id', (req, res) =>{
    let result = viewMember(req.params.id);
    result
    .then(member =>{
        res.json(member);
    })
    .catch(err => {
        res.status(400).json({
            error:err
        });
    });
});

// View members
route.get('/members', (req, res) => {
    let result = viewMembers();
    result
        .then(members => {
            res.json(members);
        })
        .catch(err => {
            res.status(400).json({
                error:err
            });
        });
});

// Create member
route.post('/create_member', (req, res) =>{
    const {value,error} = validateMember(req.body);
        if(!error){
            let result = createMember(req.body);
        result
            .then(member => {
                res.json({
                    valor:member
                });
            })
            .catch(err => {
                res.status(400).json('Number already in use.');
            });
        }
        else{
            const err = error.message;
            res.status(400).send(err);
        }
});

// Update member
route.put('/edit_member/:id', (req, res) =>{
    let result = updateMember(req.params.id, req.body);
    result
    .then(member =>{
        res.json({
            valor:member
        });
    })
    .catch(err => {
        res.status(400).json('Number already in use.');
    });
});

// Delete member
route.delete('/delete_member/:id', (req, res) => {
    let result = deleteMember(req.params.id);
    result
    .then(member =>{
        res.json({
            valor:member
        });
    })
    .catch(err => {
        res.status(400).json({
            error:err
        });
    });
});

// Renew membership
route.put('/membership_renew/:number', (req, res) =>{
    let result = activateMembership(req.params.number);
    result
    .then(member =>{
        res.json({
            valor:member
        });
    })
    .catch(err => {
        res.status(400).json({
            error:err
        });
    });
});


// View members function
async function viewMembers(){
    let members = await Member.find();
    return members;
}

// View member function
async function viewMember(id){
    let member = await Member.findById(id);
    return member;
}

// Validate member function
function validateMember(body){
    const schema = Joi.object({
        name:Joi.string().min(3).max(255).required(),
        age:Joi.number().min(17).max(65).required(),
        number:Joi.number().min(1).max(9999999999).required(),
        weight:Joi.string().required(),
        height:Joi.string().required()
    });
    return (schema.validate(body));
}

// Create member function
async function createMember(body){
    let member = new Member({
        name : body.name,
        age : body.age,
        number : body.number,
        weight: {w : body.weight},
        height: {h : body.height}
    });
    return await member.save();
}

// Update member function
async function updateMember(id, body){
    let member = await Member.findByIdAndUpdate(id, {
        $set:{
            name: body.name,
            age: body.age,
            number: body.number,
            weight: {w : body.weight},
            height: {h : body.height}
        }
    }, {new:true});
    return member;
}

// Delete member function
async function deleteMember(id){
    let member = await Member.findByIdAndDelete(id);
    return member;
}

// Activate membership function
async function activateMembership(number){
    let member = await Member.findOneAndUpdate(number, {
        $set:{
            membership: 30,
            status: true
        }
    }, {new:true});
    return member;
}


module.exports = route;