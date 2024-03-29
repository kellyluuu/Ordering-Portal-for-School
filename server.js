
// *********************************
// Global Variables & Controller Instantiation
// *********************************
const express = require('express')
require('dotenv').config()
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const storeController = require('./controllers/storeController')
const idController = require('./controllers/idController')
const session = require("express-session");
const MongoStore = require("connect-mongo");
const UserRouter = require("./controllers/user");



const db = mongoose.connection
db.on("error", (err) => console.log(err.message + " is mongo not running?"))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))


// *********************************
// Creating Application Object
// *********************************

const app = express()

// *********************************
// Routers
// *********************************

app.get('/',(req,res)=>{
    res.redirect('/store')
  })

  const DATABASE_URL = process.env.DATABASE_URL
// *********************************
// Middleware
// *********************************
// Global Middleware
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

// Router Specific Middleware
app.use(express.urlencoded({extended: true}))
app.use("/static", express.static('public'))
app.use(methodOverride('_method'));

const SECRET = process.env.SECRET
app.use(
  session({
    secret: SECRET,
    store: MongoStore.create({ mongoUrl: DATABASE_URL }),
    saveUninitialized: true,
    resave: false,
  })
);

app.use("/user", UserRouter);
app.use('/store',storeController)
app.use('/badge', idController)


// *********************************
// Routes that Render Pages with EJS
// *********************************





// *********************************
// API Routes that Return JSON
// *********************************





// *********************************
// Server Listener
// *********************************

const d = new Date()
app.listen(PORT,()=> console.log(`(╯°□°)╯ PROJECT-2 on PORT ${PORT} - ${d.toLocaleString('en-US')}`))

