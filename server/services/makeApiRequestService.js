const axios = require("axios");
const eapts_sync_logger = require("../utils/eapts_sync_logger");
const https = require("https");

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const makeApiRequest = async () => {
  try {
    const response = await instance.post("https://localhost:1338/item", {
      timeout: 5000,
    });
    eapts_sync_logger.info("Items updated successfully", response);
  } catch (err) {
    eapts_sync_logger.error("Error updating items:", err);
  }
  try {
    const response = await instance.post("https://localhost:1338/du", {
      timeout: 5000,
    });
    eapts_sync_logger.info("Dispensing units updated successfully", response);
  } catch (err) {
    eapts_sync_logger.error("Error updating dispensing units:", err);
  }
};

makeApiRequest();
