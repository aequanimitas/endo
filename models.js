var common = require('./common'),
    Item = common.Bookshelf.Model.extend({
      tableName: 'item'
    }),
    Items = common.Bookshelf.Collection.extend({
      model: Item
    }),
    exports = module.exports = {}

exports.Item = Item;
exports.Items = Items;
exports.save = function(item) {

};
