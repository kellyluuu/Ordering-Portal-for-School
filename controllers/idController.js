
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


// //NEW 
// storeRouter.get('/new',(req,res)=>{
//     res.render('new.ejs')
// })

// //CREATE
// storeRouter.post('/',(req,res)=>{
//     Product.create(req.body,(err, createdProduct)=>{
//         if(err){
//             console.log(err)
//             res.send(err)
//         }else{
//             res.redirect('/store')
//         }
//     })
// })

// //ID ROUTE 
// storeRouter.get('/id',(req,res)=>{
//     res.render('id.ejs')
// })

// //SHOW
// storeRouter.get('/:id',(req,res)=>{
//     Product.findById(req.params.id, (err,product)=>{
//         res.render('show.ejs', {product})
//     })
// })


// //EDIT
// storeRouter.get('/:id/edit',(req,res)=>{
//     Product.findById(req.params.id,(err, editProduct)=>{
//         res.render('edit.ejs',{editProduct})
//     })
// })


// //UPDATE
// storeRouter.put('/:id',(req,res)=>{
//     req.body.price = parseFloat(req.body.price)
//     req.body.qty = parseInt(req.body.qty)
//     Product.findByIdAndUpdate(req.params.id, req.body, (err,updateProduct)=>{
//         if(err){
//             console.log(err)
//             res.send(err)
//         }else{
//             res.redirect(`/store/${req.params.id}`)
//         }
//     })
// })


// //DELETE
// storeRouter.delete('/:id',(req,res)=>{
//     Product.findByIdAndDelete(req.params.id, (err, deleteProduct)=>{
//         res.redirect('/store')
//     })
// })

module.exports = idRouter;