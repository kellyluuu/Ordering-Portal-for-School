
const express = require('express');
const Product = require('../models/product');
const productSeed = require('../models/productSeed');
const storeRouter = express.Router();

// const imgbbUploader = require("imgbb-uploader");

// const options = {
//   apiKey: process.env.IMGBB_API_KEY, // MANDATORY

//   imagePath: "./your/image/path", // OPTIONAL: pass a local file (max 32Mb)

//   name: "yourCustomFilename", // OPTIONAL: pass a custom filename to imgBB API

//   expiration: 3600 /* OPTIONAL: pass a numeric value in seconds.
//   It must be in the 60-15552000 range (POSIX time ftw).
//   Enable this to force your image to be deleted after that time. */,

//   // imageUrl: "https://placekitten.com/500/500", // OPTIONAL: pass an URL to imgBB (max 32Mb)

//   // base64string:
//   //   "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEklEQVR42mNcLVNbzwAEjDAGACcSA4kB6ARiAAAAAElFTkSuQmCC",
//   /* OPTIONAL: pass base64-encoded image (max 32Mb)

//   Enable this to upload base64-encoded image directly as string. (available from 1.3.0 onward)
//   Allows to work with RAM directly for increased performance (skips fs I/O calls).
//   Beware: options.imagePath will be ignored as long as options.base64string is defined! 
//   */
// };

// imgbbUploader(options)
//   .then((response) => console.log(response))
//   .catch((error) => console.error(error));



// CREATE SEED

storeRouter.get('/seed', (req, res) => {
    Product.deleteMany({}, (err, deletedProducts) => {
        Product.create(productSeed, (err, data) => {
            res.redirect('/store');
        });
    });
});

//INDEX 
storeRouter.get('/',(req,res)=>{
    Product.find({},(err, products)=>{
        res.render('index.ejs',{products},)
    })
})

//NEW 
storeRouter.get('/new',(req,res)=>{
    res.render('new.ejs')
})

//CREATE
storeRouter.post('/',(req,res)=>{
    Product.create(req.body,(err, createdProduct)=>{
        if(err){
            console.log(err)
            res.send(err)
        }else{
            res.redirect('/store')
        }
    })
})


//SHOW
storeRouter.get('/:id',(req,res)=>{
    Product.findById(req.params.id, (err,product)=>{
        res.render('show.ejs', {product})
    })
})


//EDIT
storeRouter.get('/:id/edit',(req,res)=>{
    Product.findById(req.params.id,(err, editProduct)=>{
        res.render('edit.ejs',{editProduct})
    })
})


//UPDATE
storeRouter.put('/:id',(req,res)=>{
    req.body.price = parseFloat(req.body.price)
    req.body.qty = parseInt(req.body.qty)
    Product.findByIdAndUpdate(req.params.id, req.body, (err,updateProduct)=>{
        if(err){
            console.log(err)
            res.send(err)
        }else{
            res.redirect(`/store/${req.params.id}`)
        }
    })
})

//DELETE
storeRouter.delete('/:id',(req,res)=>{
    Product.findByIdAndDelete(req.params.id, (err, deleteProduct)=>{
        res.redirect('/store')
    })
})



module.exports = storeRouter;