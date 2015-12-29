var pkg = require('./package.json');
var appInfo = `${pkg.name} v${pkg.version}`;

function start() {
  var args = process.argv;
  args = args.slice(2);
  var dict = args.map(function(o) {
    var obj = {}, 
        temp = o.split('=');
    obj[temp[0]] = temp[1];
    return obj;
  });
  if (!args.length || !dict.length) {
    var usage = [];
    usage.push('    -i, --item    Item name');
    usage.push('    -e, --expiry  Expiration Date');
    var message = appInfo + '\nUsage:\n' + usage.join('\n');
    console.log(message);
    process.exit(1);
  } else {
    dict.forEach(function(e,i,a) {
      if (Object.keys(e).indexOf('--item') !== -1 ||
          Object.keys(e).indexOf('--expiry') !== -1) {
        if (e[Object.keys(e)[0]] !== undefined) {
          console.log('Hi');
        } else {
          var message = appInfo  + '\n-i, --item argument has no value';
          console.log(message);
          process.exit(1);
        }
      }
    });
  }
}

start();
