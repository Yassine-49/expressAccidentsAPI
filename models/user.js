'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      unique: {
        args: true,
        msg: 'Email address already in use!'
      } // TODO: unique is not working!
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      async beforeCreate(user, options){
        try {
          const salt = await bcrypt.genSalt(10);
          const passwordHash = await bcrypt.hash(user.password, salt);
          user.password = passwordHash;
        } catch (error) {
          throw new Error(error);
        }
      }
    }
  });

  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.AccidentEntry)
  };

  User.isValidPassword = async function(user, enteredPassword)
  {
    try {
      return await bcrypt.compare(enteredPassword, user.password);
    } catch (error) {
      throw new Error(error);
    }
  };

  return User;
};
