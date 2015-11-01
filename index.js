var moment = require('moment'),
    cli = require('./cli'),
    dateFormat = 'YYYY-MM-DD HH:mm:s.ms Z',
    packageInfo = require('./package.json'),
    item = { 
      name: '',
      serialNumber: '',
      createdAt: moment(new Date()).format(dateFormat),
      updatedAt: moment(new Date()).format(dateFormat),
      manufactureDate: '',
      expirationDate: '',
    },
    knex = require('./common').knex;

function manufactureToday(item) {
  if (!item['manufacture']) {
    item['manufacture'] = moment(new Date()).format(dateFormat);
  }
  var dta = [item['name'], item['manufacture'], item['expiry']];
  db.add(item, dta);
}

function getNamedArguments(e) {
  if (e.includes('--') && e.indexOf('=') > 0) return e;
}

function removedUndefineds(e) {
  if (e !== 'undefined') return e;
}

function defaultPath(e) {
  item['name'] = e[0];
  item['expiry'] = e[1];
  manufactureToday(item);
}

function prepItem(iName, iArgs) {
  var item = {};
  item['name'] = iName;
  Array.prototype.forEach.call(iArgs, function(e,i,a) {
    if (e.includes('--') && e.indexOf('=') > 0) {
      var e = e.slice(2);
      var keyValue = e.split('=');
      var e = {
        'key': keyValue[0],
        'value': keyValue[1]
      }
      if (keyValue[0] == 'expiry') {
        item['expiry'] = keyValue[1];
      } else {
        item['manufacture'] = keyValue[1];
      }
    }
  });
  manufactureToday(item);
};

function usage() {
  console.log('Options go here');
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

function startTask(args) {
// just insert for now, familiarization purposes
  var models = require('./models'),
      obj = {
        args: process.argv.slice(2),
        requiredFlags: ['-bb', '-item']
      },
      itemModel = cli.withFlags(obj);
  if (itemModel.obj) {
    models.Item.forge({
      name: itemModel.obj['-item'],
      serialNumber: '123456',
      createdAt: moment(new Date()).format(dateFormat),
      updatedAt: moment(new Date()).format(dateFormat),
      manufactureDate: moment(new Date()).format(dateFormat),
      expirationDate: itemModel.obj['-bb']
    })
    .save()
    .then(function(item) {
      console.log(item);
    })
    .catch(function(err) {
      console.error(err); 
    })
//   just destroy for now since this is still a cli app
    .finally(function() {
      knex.destroy();
    });
  }
}

startTask(process.argv.slice(2));
