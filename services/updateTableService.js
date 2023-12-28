const dbOperations = require("../db/dbOperations");
const externalApiService = require("../services/externalApiService");
const eapts_sync_logger = require("../utils/eapts_sync_logger");

const updateItems = async (req,res,next) => {
  try {
    const items = await externalApiService.getItems();
    await dbOperations.insertOrUpdateItems(items);
    eapts_sync_logger.info("Items updated successfully");
    res.send("Items updated successfully");
    next();
  } catch (err) {
    eapts_sync_logger.error("Error updating items:", err);
    next(err);
  }
};

const updateDu = async (req,res,next) => {
  try {
    const du = await externalApiService.getDispensingUnit();
    await dbOperations.insertDispensingUnit(du);
    eapts_sync_logger.info("Dispensing Unit updated successfully");
    res.send("Dispensing Unit updated successfully");
    next();
  } catch (err) {
    eapts_sync_logger.error("Error updating dispensing unit:", err);
    next(err)
  }
};

module.exports = {
  updateDu,
  updateItems,
};
