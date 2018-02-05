var express = require('express');
var logger = require('morgan');
var path = require('path');
var app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../client/build')));

// routes
app.use('/geocode', require('./routes/geocoder'));

app.listen(process.env.LISTEN, function () {
    console.log(`Geocoder app listening on ${process.env.LISTEN}`);
});