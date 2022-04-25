
const express = require('express');
const badge = require('../models/badge');
const badgeSeed = require('../models/badgeSeed');
const idRouter = express.Router();


// CREATE SEED
idRouter.get('/seed', (req, res) => {
    badge.deleteMany({}, (err, deleteBadges) => {
        badge.create(badgeSeed, (err, data) => {
            res.redirect('/badge');
        });
    });
});

//INDEX 
idRouter.get('/',(req,res)=>{
        res.render('badge.ejs')
    })



module.exports = idRouter;