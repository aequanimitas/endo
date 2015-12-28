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

function objValid(obj) {
  // add valid formats
  var errorStack = [];

      if (!moment(obj['bb']).isValid()) {
        errorStack.push('Expiration date invalid, invalid format');
      }

      if(moment(new Date()) < moment(obj['bb'])) {
        errorStack.push('Expiration date invalid, should be after today');
      }
      
  return errorStack;
}

function startTask(args) {
// just insert for now, familiarization purposes
  var models = require('./models'),
      obj = {
        args: process.argv.slice(2),
        requiredFlags: ['-bb', '-item']
      },
      itemModel = cli.withFlags(obj);
  if (objValid(itemModel).length == 0) {
    item.name = itemModel['item']
    item.expirationDate = moment(itemModel['bb']).format(dateFormat);
    item.serialNumber = '123456';
    models.Item.forge(item)
    .save()
    .then(function(model) {
      console.log(model.attributes.name + ' has been saved and will expire at '+ 
                  moment(model.attributes.expirationDate).format('dddd, Do of MMMM YYYY'));
    })
    .catch(function(err) {
      console.error(err); 
    })
//   just destroy for now since this is still a cli app
    .finally(function() {
      knex.destroy();
    });
  } else {
    throw new Error(objValid(itemModel).join('\n'));
  }
}

startTask(process.argv.slice(2));
