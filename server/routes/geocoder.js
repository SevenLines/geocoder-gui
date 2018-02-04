var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', (req, res) => {
    db.knex.raw(`SELECT geocode(?)`, req.query.query).then(data => {
        res.json({
            lat: data.rows[0].geocode ? data.rows[0].geocode.lat : null,
            lon: data.rows[0].geocode ? data.rows[0].geocode.lon : null,
        })
    })
});

module.exports = router;