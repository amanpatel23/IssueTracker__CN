require('dotenv').config();

// require mongoose
const mongoose = require('mongoose');

// connecting to mongo atlas dababase using connection string
mongoose.connect(process.env.MONGODB_URI);

// storing the database connection
const db = mongoose.connection;

// checking the database connection
db.on('error', console.error.bind(console, 'error connecting to the database'));
db.once('open', function() {
    console.log('connected to the database: MongoDB');
});

module.exports = db;