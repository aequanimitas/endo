var pg = require("pg"),
    config = require("./config.js.local"),
    connectionDetails = config.vendor + "://" + config.username + ":" + config.password + "@" + config.url + "/" + config.db_name;

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
};

function add(item, dta) {
  query("INSERT INTO endo_items VALUES (DEFAULT, $1, $2, $3)", dta);
};

function get(item) {
  return query("SELECT * FROM endo_items");
}

// 
exports.query = query;
exports.add = add;

