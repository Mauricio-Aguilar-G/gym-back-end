const express = require('express');
const route = express.Router();
const Member = require('../models/member_model');

// Login member
route.put('/login/:number', (req, res) =>{
    const query = Member.findOne({number:req.params.number});
    query.select('membership number name');
    query.exec( function (err, member) {
        if(err) return handleError(err);
        var neW = member.membership;
        neW = neW-1;
        // console.log(neW);
        if(member.membership>0){
            let result = updateMembership(member.number,neW);
            result
                .then(member =>{
                    res.json({
                        member: member.name,
                        membership: member.membership
                    });
                })
                .catch(err => {
                    res.status(400).json({
                        error:err
                    });
                });
        }
        else if(member.membership == 0){
            let result = desactivateMembership(member.number,neW);
            result
                .then(member =>{
                    res.json('Membership has ended, please renew.');
                })
                .catch(err => {
                    res.status(400).json({
                        error:err
                    });
                });
        }
        else{
            res.json('Membership has ended, please renew.');
        }
    });
});

// Update membership function
async function updateMembership(number, membershipNew){
    let member = await Member.findOneAndUpdate(number, {
        $set:{
            membership: membershipNew
        }
    }, {new:true});
    return member;
}

// Desactivate membership function
async function desactivateMembership(number, membershipNew){
    let member = await Member.findOneAndUpdate(number, {
        $set:{
            membership: membershipNew,
            status: false
        }
    }, {new:true});
    return member;
}

module.exports = route;