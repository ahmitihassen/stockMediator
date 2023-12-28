const Item = require("../models/itemModel");
const DispensingUnit = require("../models/duModel");
const eapts_sync_logger = require("../utils/eapts_sync_logger");

const insertOrUpdateItems = async (data) => {
  try {
    for (const itemData of data) {
      try {
        const [item, created] = await Item.findOrCreate({
          where: {
            itemUnit: itemData.itemUnit,
            institution: itemData.institution,
          },
          defaults: itemData,
        });

        if (!created) {
          if (item.changed("quantity") || item.changed("hasStock")) {
            await Item.update(
              { hasStock: itemData.hasStock, quantity: itemData.quantity },
              {
                where: {
                  itemUnit: itemData.itemUnit,
                  institution: itemData.institution,
                },
              }
            );
            eapts_sync_logger.info(
              `Item ${itemData.itemUnit} updated successfully`
            );
          } else {
            eapts_sync_logger.info("Nothing to update or insert");
          }
        } else {
          eapts_sync_logger.info(
            `New item ${itemData.itemUnit} inserted successfully`
          );
        }
      } catch (err) {
        eapts_sync_logger.error();
        `Error processing item ${itemData.itemUnit}:`, err;
        throw err;
      }
    }
  } catch (err) {
    eapts_sync_logger.error("Error processing items:", err);
    throw err;
  }
};

const insertDispensingUnit = async (data) => {
  try {
    for (const duData of data) {
      try {
        const [du, created] = await DispensingUnit.findOrCreate({
          where: {
            institutionName: duData.institutionName,
          },
          defaults: duData,
        });
        if (created)
          eapts_sync_logger.info(
            `New Dispensing Unit ${duData.institutionName} inserted successfully`
          );
        else
          eapts_sync_logger.info(
            `Dispensing Unit ${duData.institutionName} already exists`
          );
      } catch (err) {
        eapts_sync_logger.error(
          `Error processing Dispensing Unit ${duData.institutionName},`,
          err
        );
        throw err;
      }
    }
  } catch (err) {
    eapts_sync_logger.error("Error processing Dispensing Units:", err);
    throw err;
  }
};

module.exports = {
  insertDispensingUnit,
  insertOrUpdateItems,
};
