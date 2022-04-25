const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const UserRouter = express.Router();


// Routes

UserRouter.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/store", {
      currentUser: req.session.username,
    });
  } else {
    res.render("login.ejs");
  }
});


// sign up - GET: takes us to sign up page
UserRouter.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

// sign up - POST: creates the user in db
UserRouter.post("/signup", async (req, res) => {
  // encrypt password first
  req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
  // create the new user in db
  User.create(req.body, (err, user) => {
    if (err) console.log(err)
    // then redirect them to log in page to sign in 
    res.redirect("/user");
  });
});


// login - POST: compares user entered data to db data for authentication
UserRouter.post("/login", (req, res) => {
  // get username and password
  const { username, password } = req.body;
  // check if user exists
  User.findOne({ username }, async (err, user) => {
    // handle if user doesn't exist
    if (err || !user) res.send("This account doesnt exist");
    // compare passwords
    const passwordMatches = await bcrypt.compare(password, user.password);
    // check is match was a success
    if (!passwordMatches) res.send("Incorrect Password");
    // save login info in sessions
    req.session.loggedIn = true
    req.session.username = username
    console.log(req.session)
    // redirect to dashboard
    res.redirect("/store");
  });
});

// logout
UserRouter.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/user")
    })
})

// Export router
module.exports = UserRouter;
