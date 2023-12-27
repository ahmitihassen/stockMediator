const api_logger = require("../utils/api_logger");

const errorHandlingMiddleware = (err, req, res, next) => {
  api_logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );
  res.status(err.status || 500).json({
    error: err.message,
  });
  next();
};

module.exports = errorHandlingMiddleware;
