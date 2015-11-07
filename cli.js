exports = module.exports = {};
var messages = require('./error/messages');

function arrDiff(x, y) {
  return x.filter(function(a) {
    return y.indexOf(a) < 0;
  });
};

function flagsHasArguments(x) {
  var t = x.split('=');
  return (t[1] === undefined || t[1] === '')
}

function partial(aFn, aArgFn) {
  return function inFn(b) {
    return aFn(b, aArgFn);
  }
}

function toKv(x, cb) {
  var y = x.split('=');
  if (cb) y[0] = cb(y[0])
  y[0] = y[1];
  return y;
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
    exitMessage(messages['missingArgs'](flagArgs.map(removeFlagSymbols)));
  };
  return toObjPair(app.args, removeFlagSymbols);
}
