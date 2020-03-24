'use strict';
module.exports = (sequelize, DataTypes) => {
  const AccidentEntry = sequelize.define('AccidentEntry', {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    isResolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dateNtime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    latitude: {
      type: DataTypes.DOUBLE,
      validate: {
        min: -180,
        max: 180,
      }
    },
    longitude: {
      type: DataTypes.DOUBLE,
      validate: {
        min: -90,
        max: 90,
      }
    },
    numberOfInjuries: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    }
  }, {});
  AccidentEntry.associate = function(models) {
    // associations can be defined here
  };
  return AccidentEntry;
};