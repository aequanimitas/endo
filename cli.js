exports = module.exports = {};
var appName = "", 
    appDescription = "",
    messages = require('./error').messages;

function circular(app, opt, args) {
  if (opOrApp(app, opt, "subapps")) {
    circular(app.subapps[opt], args[0], args.slice(1));
  } else if (opOrApp(app, opt, "operations")) {
    app.operations[opt]();
  } else {
    help(app);
  }
}

exports.sequential = function(app) {
  if (app.args.length == 0) {
    app.hasOwnProperty("help") ? app.help() : help(app);
    return;
  }
  appName = app.name;
  appDescription = app.description;
  circular(app, app.args[0], app.args.slice(1));
}

function opOrApp(app, opt, prop) {
  return !(app[prop] === undefined) && app[prop].hasOwnProperty(opt);
}

function help(app) {
  var keyz = Object.keys(app.subapps ? app.subapps : app.operations).join(", "),
      message = "\n" + appName + ": " + appDescription + "\n\n" +
                "\nUsage";
  if (keyz.length == 0) keyz = "none"
  keyz.split(", ").forEach(function(v) {
    var appInvoke = appName + " " + app.name;
    message += "\n  " + appInvoke + " " + v;
  });
  exitMessage(message);
}

function arrDiff(x, y) {
  return x.filter(function(a) {
    return y.indexOf(a) < 0;
  });
};

function flagsHasArguments(x) {
  var t = x.split('=');
  return (t[1] === undefined || t[1] === '')
}

function toObjPair(pairs, cb) {
  var obj = {}
  pairs.forEach(function(x) {
    var t = x.split('=');
    if (cb) t[0] = cb(t[0]);
    obj[t[0]] = t[1];
  });
  return obj;
};

function removeFlagSymbols(x) {
  return x.replace(/-|=/g, '');
}

function exitMessage(message) {
  throw new Error(message);
};


exports.withFlags = function(app) {
  var missingFlags = arrDiff(app.requiredFlags, 
                             Object.keys(toObjPair(app.args)))
                             .map(removeFlagSymbols),
      flagArgs = app.args.filter(flagsHasArguments);
  if (app.requiredFlags && missingFlags.length > 0) {
    exitMessage(messages['requiredFlags'](missingFlags));
  }
  if (flagArgs.length > 0) {
    exitMessage(messages['missingArgs'](flagArgs));
  };
  return toObjPair(app.args, removeFlagSymbols);
}
