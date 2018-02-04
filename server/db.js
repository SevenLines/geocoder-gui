var knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'm',
        password: '12345',
        database: 'gis_data'
    }
});

module.exports = require('bookshelf')(knex);