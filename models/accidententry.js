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
    numberOfInjuries: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
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
    userId: {
      type: DataTypes.INTEGER,
    }
  }, {});

  AccidentEntry.associate = function(models) {
    // associations can be defined here
    AccidentEntry.belongsTo(models.User);
  };
  
  return AccidentEntry;
};