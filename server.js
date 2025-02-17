require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3300
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)

// Database connection
const url = 'mongodb://localhost/momo'
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});

// Session store
let mongoStore = new MongoDbStore({
                mongooseConnection: connection,
                collection: 'sessions'
            })

// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))

app.use(flash())

// Global middleware
// app.use((req, res, next) => {
//     res.locals.session = req.session
//     res.locals.user = req.user
//     next()
// })

// Set Templete engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

// Assets
app.use(express.urlencoded({extended: false})); 
app.use(express.json()); 
app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

// Database connection
// const url = 'mongodb://localhost/momo'
// const connection = mongoose.connection;
// mongoose.connect(url, { useUnifiedTopology : true, useNewUrlParser : true , }).then(() => {
//     console.log("Connection successfull");
//  }).catch((e) => console.log("No connection"))


// // Session store
// let mongoStore = new MongoDbStore({
//     mongooseConnection: connection,
//     collection: 'sessions'
// })

// // Session config
// app.use(session({
//     secret: process.env.COOKIE_SECRET,
//     resave: false,
//     store: mongoStore,
//     saveUninitialized: false,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
// }))