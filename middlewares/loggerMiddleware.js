const api_logger = require("../services/logging/api_logger");

const loggerMiddleware = (req, res, next) => {
  api_logger.info(`${req.method} ${req.url} ${req.body}`);
  next();
};

module.exports = loggerMiddleware;
