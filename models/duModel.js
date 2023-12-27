const sequelize = require("../db/database");
const { DataTypes } = require("sequelize");

const DispensingUnit = sequelize.define("DispensingUnit", {
  institutionName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rowGuid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = DispensingUnit;
