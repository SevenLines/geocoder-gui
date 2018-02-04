let localSettings = require('../local_settings');

var knex = require('knex')(localSettings.db);

module.exports = require('bookshelf')(knex);