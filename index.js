// require express
const express = require('express');
const app = express();

// defining port
const port = 8000;

// accessing database connection
const db = require('./config/mongoose');

const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

// requiring custome middleware
const cMiddleware = require('./config/middleware');

app.use(express.urlencoded());

// settings for static files and views and view engine
app.use(express.static('./assets'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', './views');

// settingup session
app.use(session({
    name: 'issueTracker',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
    })
}))

app.use(flash());
app.use(cMiddleware.setFlash);

// getting routes
const myRouter = require('./routes');
app.use('/', myRouter);

// running the application
app.listen(port, function(error) {
    if (error) {
        console.log(`Error in running the server at port ${port} `, error);
        return;
    }
    console.log(`Server is up and running at port ${port}`);
})