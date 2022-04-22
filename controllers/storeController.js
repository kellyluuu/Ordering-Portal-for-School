const e = require('express');
const express = require('express');
// Add require models
const storeRouter = express.Router();


// CREATE SEED

//INDEX 
storeRouter.get('/', (req,res)=>{
    res.render('index.ejs')
})

//NEW 
storeRouter.get('/new',(req,res)=>{
    res.render('new.ejs')
})

//CREATE
storeRouter.post('/',(req,res)=>{
    console.log(`(╯°□°)╯ create route is working`)
    res.redirect('/')
})


//SHOW
storeRouter.get('/:id',(req,res)=>{
    res.render('show.ejs')
})


//EDIT
storeRouter.get('/:id/edit',(req,res)=>{
    res.render('edit.ejs')
})


//UPDATE
storeRouter.put('/:id',(req,res)=>{
    console.log('(╯°□°)╯ update route is working')
    res.redirect('/')
})


//DELETE
storeRouter.delete('/:id',(req,res)=>{
    console.log('(╯°□°)╯ delete route is working')
    res.redirect('/')
})

module.exports = storeRouter;