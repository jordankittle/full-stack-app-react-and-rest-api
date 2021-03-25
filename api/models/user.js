'use strict';
const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Course, {
        foreignKey: {
          fieldName: "userId",
          allowNull: false
        }
      });
    }
  };
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name is required"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name is required"
        }
      },
    },
    emailAddress: {
      type: DataTypes.STRING,
      unique: {
        msg: "E-mail address already in use"
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "E-mail is required"
        },
        isEmail: {
          msg: "Valid e-mail address required"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val){
          if(val === this.confirmPassword){
          const hashedPassword = bcrypt.hashSync(val, 10);
          this.setDataValue('password', hashedPassword);
        }
      },
      validate: {
        notNull: {
          msg: 'Please enter password',
        },
        notEmpty: {
          msg: "Please enter password"
        },
      }
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please confirm a password',
        },
        notEmpty: {
          msg: 'Please confirm a password',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};