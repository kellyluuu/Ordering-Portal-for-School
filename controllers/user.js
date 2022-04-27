const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Product = require('../models/product');
const UserRouter = express.Router();
function UserCart(username) {
  this.username = username;
  this.items =[];
}

let userCart = UserCart()

let cartArr= []

/* -------------------------------------------------------------------------- */
/*                                  // Routes                                 */
/* -------------------------------------------------------------------------- */

UserRouter.get("/", (req, res) => {
  const alertlog ='Please sign in'
  if (req.session.loggedIn) {
    res.redirect("/user/store", {
      currentUser: req.session.username,
    });
  } else {
    res.render("login.ejs",{alertlog});
  }
});


/* ---------------------------- //CART ==> INDEX ---------------------------- */
UserRouter.get('/cart',(req,res)=>{
  const session = req.session
  const date = new Date().toLocaleString('en-US')
  const cart = cartArr
  let total = 0 
  cart.forEach(cart=>{
    let cost = parseInt(cart.description)*cart.price.toFixed(2)
    total = total + cost 
    
  })
  console.log(session)
  console.log('get cartArr',cart)
  res.render('cart.ejs',{session, date, cart, total})
})

/* ----------------------------------- end ---------------------------------- */


/* ----------- //CART ===> New or add items by clicking buy button ---------- */
//UPDATE AFTER BUY 
UserRouter.put('/:id/:qty',(req,res)=>{
  Product.findById(req.params.id,(err, editProduct)=>{
  editProduct.description = req.params.qty
  let buyArr = editProduct
  
  cartArr.push(buyArr)
  console.log('put cart',cartArr)
  res.redirect('/store')        
})
})

/* ----------------------------------- end ---------------------------------- */


// sign up - GET: takes us to sign up page
UserRouter.get("/signup", (req, res) => {
  const alertlog =`Create a new user`
  res.render("signup.ejs",{alertlog});
});

// sign up - POST: creates the user in db
UserRouter.post("/signup", async (req, res) => {

  // encrypt password first
  req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
  // create the new user in db
  User.create(req.body, (err, user) => {
    const alertlog =`Existing user. Enter another email.`
    if (err){ 
      res.render('signup.ejs',{alertlog})
    }else{
      res.redirect("/user")
    }
  });
});


// login - POST: compares user entered data to db data for authentication
UserRouter.post("/login", (req, res) => {
  // get username and password
  const { username, password } = req.body;
  // check if user exists
  User.findOne({ username }, async (err, user) => {
    // handle if user doesn't exist
    if (err || !user){
      const alertlog =`This account doesnt exist`
      res.render('login.ejs',{alertlog})
    }else{
    // compare passwords
    const passwordMatches = await bcrypt.compare(password, user.password);
    // check is match was a success
    if (!passwordMatches){
      const alertlog =`Incorrect Password`
    res.render('login.ejs',{alertlog});
    // save login info in sessions
    }else{
    req.session.loggedIn = true
    req.session.username = username
    UserCart(req.session.username)
    console.log(req.session)
    // redirect to dashboard
    res.redirect("/store");
  }}
})
})

// logout
UserRouter.get("/logout", (req, res) => {
  const alertlog =`${req.session.username} logged out`
  cartArr= []
    req.session.destroy((err) => {
        res.render("login.ejs",{alertlog})
       
    })
})

// Export router
module.exports = UserRouter;
