var exports = module.exports = {};
var config = require('./config/knexfile.local'), 
    knex = require('knex')(config.development),
    Bookshelf = require('bookshelf')(knex);

exports.knex = knex;
exports.Bookshelf = Bookshelf;
