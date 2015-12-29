var pkg = require('./package.json');
var appInfo = `${pkg.name} v${pkg.version}`;
var message = appInfo + '\nUsage:';

function start() {
  var args = process.argv;
  if (args.slice(2).length === 0) {
    console.log(message);
  }
}

start();
