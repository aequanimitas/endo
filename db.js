var pg = require("pg");
var config = require("./config.js.local");
var connectionDetails = config.vendor + "://" + config.username + ":" + config.password + "@" + config.url + "/" + config.db_name;

var exports = module.exports = {};

function query(text, values, cb) {
  pg.connect(connectionDetails, function(error, client, done) {
    if (error) console.log("Error: ", error);
    
    // skip callback for now
    var query = client.query(text, values);
    
    query.on("end", function(res) {
      done();
    });
    
  });
}

// 
exports.query = query;
