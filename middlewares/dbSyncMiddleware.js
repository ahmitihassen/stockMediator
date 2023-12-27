const sequelize = require("../db/database");

const syncDB = async (req,res,next) => {
  try {
    await sequelize.sync();
    console.log("Database synced");
  } catch (err) {
    console.log("Error syncing database");
    console.log(err);
  }
  next();
};

module.exports = syncDB;
