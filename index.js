var moment = require("moment"),
    db = require("./db"),
    operations = {
      "add": create
    },
    item = {},
    date_format = "YYYY-MM-DD";

function create() {
  if (!item["manufacture"]) {
    item["manufacture"] = moment(new Date()).format(date_format);
  }
  console.log(item);
  var dta = [item["name"], item["manufacture"], item["expiry"]];
  db.query("INSERT INTO endo_items VALUES (DEFAULT, $1, $2, $3)", dta);
}

function getNamedArguments(e) {
  if (e.includes("--") && e.indexOf("=") > 0) return e;
}

function removedUndefineds(e) {
  if (e !== "undefined") return e;
}

function defaultPath(e) {
  item["name"] = e[0];
  item["expiry"] = e[1];
  create();
}

function prepItem(iName, iArgs) {
  item["name"] = iName;
  Array.prototype.forEach.call(iArgs, function(e,i,a) {
    if (e.includes("--") && e.indexOf("=") > 0) {
      var e = e.slice(2);
      var keyValue = e.split("=");
      var e = {
        "key": keyValue[0],
        "value": keyValue[1]
      }
      if (keyValue[0] == "expiry") {
        item["expiry"] = keyValue[1];
      } else {
        item["manufacture"] = keyValue[1];
      }
    }
  });
  console.log(item);
  create();
};

function init(args) {
  var item = {};
  var hasArgs = args.map(getNamedArguments).filter(removedUndefineds);
  if (hasArgs.length > 0) {
    prepItem(args[0], hasArgs);
  } else {
    defaultPath(args);
  }
}

init(process.argv.slice(2));
