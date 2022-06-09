const express = require('express');
const Joi = require('joi');
const route = express.Router();
const Admin = require('../models/admin_model');

// View admin
route.get('/:id', (req, res) =>{
    let result = viewAdmin(req.params.id);
    result
    .then(admin =>{
        res.json(admin);
    })
    .catch(err => {
        res.status(400).json({
            error:err
        });
    });
});

// View admins
route.get('/', (req, res) => {
    let result = viewAdmins();
    result
        .then(admins => {
            res.json(admins);
        })
        .catch(err => {
            res.status(400).json({
                error:err
            });
        });
});

// Create an admin
route.post('/create_admin', (req, res) =>{
    const {value,error} = validateAdmin(req.body);
    if(!error){
        let result = createAdmin(req.body);
    result
        .then(admin => {
            res.json({
                valor:admin
            });
        })
        .catch(err => {
            res.status(400).json({
                error:err
            });
        });
    }
    else{
        const err = error.message;
        res.status(400).send(err);
    }
});

// Update admin
route.put('/edit_admin/:id', (req, res) =>{
    let result = updateAdmin(req.params.id, req.body);
    result
    .then(admin =>{
        res.json({
            valor:admin
        });
    })
    .catch(err => {
        res.status(400).json({
            error:err
        });
    });
});

// Delete admin
route.delete('/delete_admin/:id', (req, res) => {
    let result = deleteAdmin(req.params.id);
    result
    .then(admin =>{
        res.json({
            valor:admin
        });
    })
    .catch(err => {
        res.status(400).json({
            error:err
        });
    });
});

// Login admin
route.post('/login', (req, res) =>{
    const {value,error} = validateAdminLogin(req.body);
    if(error){
        const err = error.message;
        res.status(400).send(err);
    }
    else{
        const query = Admin.findOne({email:req.body.email});
        query.select('email password');
        query.exec( function (err, admin) {
            if(err) return handleError(err);
            if(admin){
                if(admin.password == req.body.password){
                    return res.json('Login succesfull.');
                }
                else{
                    res.json('Incorrect password.');
                }
            }else{
                return res.json('Incorrect email.');
            }
        });
    }
});

// Validate admin function
function validateAdmin(body){
    const schema = Joi.object({
        name:Joi.string().min(3).max(255).required(),
        email:Joi.string().email({minDomainSegments:2, tlds: {allow: ['com','net','mx']}}),
        password:Joi.string().required()
    });
    return (schema.validate(body));
}

// Validate admin login function
function validateAdminLogin(body){
    const schema = Joi.object({
        email:Joi.string().email({minDomainSegments:2, tlds: {allow: ['com','net','mx']}}),
        password:Joi.string().required()
    });
    return (schema.validate(body));
}

// View admin function
async function viewAdmin(id){
    let admin = await Admin.findById(id);
    return admin;
}

// View admins function
async function viewAdmins(){
    let admins = await Admin.find();
    return admins;
}

// Create admin function
async function createAdmin(body){
    let admin = new Admin({
        name : body.name,
        email : body.email,
        password: body.password
    });
    return await admin.save();
}

// Update admin function
async function updateAdmin(id, body){
    let admin = await Admin.findByIdAndUpdate(id, {
        $set:{
            name: body.name,
            email: body.email,
            password: body.password
        }
    }, {new:true});
    return admin;
}

// Delete admin function
async function deleteAdmin(id){
    let admin = await Admin.findByIdAndDelete(id);
    return admin;
}

module.exports = route;