var db = require("./db");

// assume for now
db.query("INSERT INTO endo_item VALUES ($1, $2, $3)", process.argv.slice(2));
