"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init(
    {
      img: DataTypes.STRING,
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: { message: "Name cannot be empty" },
          notNull: { message: "Name cannot be null" },
        },
      },
      buyPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { message: "Buy Price cannot be empty" },
          notNull: { message: "Buy Price cannot be null" },
        },
      },
      sellPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { message: "Buy Price cannot be empty" },
          notNull: { message: "Buy Price cannot be null" },
        },
      },
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Item",
    }
  )
  return Item
}
