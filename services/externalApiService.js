const eapts_sync_logger = require("../utils/eapts_sync_logger");
const axios = require("axios");

const formatDuResponse = (response) => {
  for (du in response) {
    const formattedDu = {
      institutionName: response[du].institutionName,
      rowGuid: response[du].rowguid,
    };
    return [formattedDu];
  }
};

const formatItemResponse = (response) => {
  for (item in response) {
    const formattedItem = {
      itemUnit: response[item].itemUnit,
      institution: response[item].institution,
      hasStock: response[item].hasStock,
      quantity: response[item].quantity,
    };
    return [formattedItem];
  }
};
///get dispensing unit from eapts
const getDispensingUnit = async () => {
  const duURL = process.env.DU_URL;
  const options = {
    auth: {
      username: process.env.APTS_USERNAME,
      password: process.env.APTS_PASSWORD,
    },
    timeout: 20000, // Timeout of 2 seconds
  };
  try {
    const du = await axios.get(duURL, options);
    eapts_sync_logger.info(du);
    return formatDuResponse(du?.data?.model);
  } catch (err) {
    eapts_sync_logger.error(err);
    throw err;
  }
};

///get items from each pharmacy in eapts
const getItems = async () => {
  try {
    const { model } = await getDispensingUnit();
    for (rowGuid in model) {
      const itemStockUrl = process.env.STOCK_URL + `=${rowGuid}`;
      const options = {
        auth: {
          username: process.env.APTS_USERNAME,
          password: process.env.APTS_PASSWORD,
        },
        timeout: 20000, // Timeout of 2 seconds
      };
      try {
        const items = await axios.get(itemStockUrl, options);
        eapts_sync_logger.info(items);
        return formatItemResponse(items.data.model);
      } catch (err) {
        eapts_sync_logger.error(err);
        throw err;
      }
    }
  } catch (err) {
    eapts_sync_logger.error(err);
    throw err;
  }
};

module.exports = {
  getItems,
  getDispensingUnit,
};
