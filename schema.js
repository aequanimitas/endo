module.exports = {
  item: {
    id: {type: 'increments', nullable: false, primary: true},
    name: {type: 'string', maxlength: 254, nullable: false, unique: true},
    createdAt: {type: 'dateTime', nullable: false},
    updatedAt: {type: 'dateTime', nullable: false},
    manufactureDate: {type: 'dateTime', nullable: false},
    expirationDate: {type: 'dateTime', nullable: false},
    serialNumber: {type: 'string', maxlength: 254, nullable: false, unique:true},
  },
};
