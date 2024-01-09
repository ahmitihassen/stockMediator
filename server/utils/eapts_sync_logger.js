const winston = require("winston");

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

const eapts_sync_logger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: "/var/log/stock/eapts_stock_error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "/var/log/stock/eapts_stock_log.log",
      level: "info",
    }),
  ],
});

module.exports = eapts_sync_logger;
