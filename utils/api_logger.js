const winston = require("winston");

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

const api_logger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: "/var/log/stock/apistock_error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "/var/log/stock/apistock_log.log",
      level: "info",
    }),
  ],
});

module.exports = api_logger;
