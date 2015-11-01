var appName = "", 
    appDescription = "";
    exports = module.exports = {},
    messages = {
      'requiredFlags': function(flags) {
         return '\nrequired flags missing: ' + flags + '\n'
       },
       'missingArgs': function(flagArgs) {
          var missingArguments = flagArgs.map(removeFlagSymbols),
              hasS = missingArguments.length > 1 ? 's' : '';
          return '\nThe required flag' + hasS + 
                 ' has no argument' + hasS +
                 ': ' + missingArguments + '\n';
       }
    };

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

function flagsHasArguments(app) {
  return app.args.filter(function(x) {
    var t = x.split('=');
    return (t[1] === undefined || t[1] === '')
  });
}

function toObjPair(pairs) {
  var obj = {}
  pairs.forEach(function(x) {
    var t = x.split('=');
    obj[t[0]] = t[1];
  });
  return obj;
};

function removeFlagSymbols(x) {
  return x.replace(/-|=/g, '');
}

function exitMessage(message) {
  console.error(message);
  process.exit(0);
};

exports.withFlags = function(app) {
  if (app.requiredFlags) {
    var missingFlags = arrDiff(app.requiredFlags, Object.keys(toObjPair(app.args))).map(removeFlagSymbols);
    if (missingFlags.length > 0) exitMessage(messages['requiredFlags'](missingFlags));
  }
  if (flagsHasArguments(app).length > 0) {
    exitMessage(messages['missingArgs'](flagsHasArguments(app)));
  };
  return toObjPair(app.args);
}
