var exports = module.exports = {};
var config = require('./config/knexfile.local'), 
    knex = require('knex')(config.development),
    Bookshelf = require('bookshelf')(knex),
    common;

exports.knex = knex;
exports.Bookshelf = Bookshelf;
