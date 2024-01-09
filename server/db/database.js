const path = require("path");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_PATH,
  logging: process.env.NODE_ENV === "development" ? console.log : false,
});

module.exports = sequelize;
