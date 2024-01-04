const eapts_sync_logger = require("../utils/eapts_sync_logger");
const axios = require("axios");

const formatDuResponse = (response) => {
  let formattedDu = [];
  for (du in response) {
    formattedDu.push({
      institutionName: response[du].institutionName,
      rowGuid: response[du].rowguid,
    });
  }
  return formattedDu;
};

const formatItemResponse = (response) => {
  let formattedItem = [];
  for (item in response) {
    formattedItem.push({
      itemUnit: response[item].itemUnit,
      institution: response[item].institution,
      hasStock: response[item].hasStock,
      quantity: response[item].quantity,
    });
  }
  return formattedItem;
};
///get dispensing unit from eapts
const getDispensingUnit = async () => {
  const duURL = process.env.DU_URL;
  const options = {
    auth: {
      username: process.env.APTS_USERNAME,
      password: process.env.APTS_PASSWORD,
    },
    timeout: 90000, // Timeout of 90 seconds
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
    let items = [];
    const du = await getDispensingUnit();
    for (item in du) {
      const itemStockUrl = process.env.STOCK_URL + `=${du[item]?.rowguid}`;
      const options = {
        auth: {
          username: process.env.APTS_USERNAME,
          password: process.env.APTS_PASSWORD,
        },
        timeout: 90000, // Timeout of 90 seconds
      };
      try {
        const response = await axios.get(itemStockUrl, options);
        items.push(...response?.data?.model);
        eapts_sync_logger.info(items);
      } catch (err) {
        eapts_sync_logger.error(err);
        throw err;
      }
    }
    return formatItemResponse(items);
  } catch (err) {
    eapts_sync_logger.error(err);
    throw err;
  }
};

module.exports = {
  getItems,
  getDispensingUnit,
};
