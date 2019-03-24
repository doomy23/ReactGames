const Moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    expiresAt: {
      type: DataTypes.DATE,
      get: function () {
        return Moment(this.getDataValue('expiresAt'));
      }
    }
  });

  return User;
};
