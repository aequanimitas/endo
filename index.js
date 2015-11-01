var moment = require('moment'),
    cli = require('./cli'),
    dateFormat = 'YYYY-MM-DD HH:mm:s.ms Z',
    packageInfo = require('./package.json'),
    item = { 
      name: '',
      serialNumber: '',
      createdAt: moment(new Date()).format(dateFormat),
      updatedAt: moment(new Date()).format(dateFormat),
      manufactureDate: moment(new Date()).format(dateFormat),
      expirationDate: '',
    },
    knex = require('./common').knex;

function startTask(args) {
// just insert for now, familiarization purposes
  var models = require('./models'),
      obj = {
        args: process.argv.slice(2),
        requiredFlags: ['-bb', '-item']
      },
      itemModel = cli.withFlags(obj);
  if (itemModel) {
    item.name = itemModel['item']
    item.expirationDate = itemModel['bb'];
    item.serialNumber = '123456';
    models.Item.forge(item)
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
