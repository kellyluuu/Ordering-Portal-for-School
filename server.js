
// *********************************
// Global Variables & Controller Instantiation
// *********************************
const express = require('express')
require('dotenv').config()
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const storeController = require('./controllers/storeController')


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
    res.send('<html><body><a href="/store" >ABC University Store</a></body></html>')
  })


// *********************************
// Middleware
// *********************************
// Global Middleware
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
// Router Specific Middleware
app.use(express.urlencoded({extended: true}))
app.use("/static", express.static('public'))
app.use(methodOverride('_method'));
app.use('/store',storeController)


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

