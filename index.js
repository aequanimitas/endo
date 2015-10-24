var moment = require("moment"),
    db = require("./db"),
    date_format = "YYYY-MM-DD";

function manufactureToday(item) {
  if (!item["manufacture"]) {
    item["manufacture"] = moment(new Date()).format(date_format);
  }
  var dta = [item["name"], item["manufacture"], item["expiry"]];
  db.add(item, dta);
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
  manufactureToday(item);
}

function prepItem(iName, iArgs) {
  var item = {};
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
  manufactureToday(item);
};

function usage() {
  console.log("Options go here");
};

function init(args) {
  if (args.length === 0) {
    usage();
    return;
  }
  var hasArgs = args.map(getNamedArguments).filter(removedUndefineds);
  if (hasArgs.length > 0) {
    prepItem(args[0], hasArgs);
  } else {
    defaultPath(args);
  }
}

function startTask(opts) {
  console.log("\nTedious: For things that you do repeatedly\n");
  if (opts.length == 0) {
    console.log("Available commands: " + Object.keys(subapps).join(", ") + "\n");
  } else if (opts.length == 1) {
    console.log("Available commands for " + opts[0] + ": " + subapps[opts[0]].operations.join(", ") + "\n");
  } else {
    subapps[opts[0]].init(opts.slice(1));
  }
}

init(process.argv.slice(2));
