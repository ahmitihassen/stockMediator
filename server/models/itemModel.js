const sequelize = require("../db/database");
const { DataTypes } = require("sequelize");

const Item = sequelize.define("Item", {
  itemUnit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  institution: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hasStock: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Item;
