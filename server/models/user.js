"use strict"
const { Model } = require("sequelize")
const { encPassword } = require("../helpers/encryption")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { message: "Username cannot be empty" },
          notNull: { message: "Username cannot be null" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { message: "Password cannot be empty" },
          notNull: { message: "Password cannot be null" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  )
  User.beforeCreate((user, options) => {
    user.password = encPassword(user.password)
  })
  return User
}
