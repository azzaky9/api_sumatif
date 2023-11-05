const winston = require("winston");

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

// Create the logger instance
const logger = winston.createLogger({
  level: "info", // Set the logging level (options: error, warn, info, verbose, debug, silly)
  format: logFormat,
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: "combined.log" }) // Log to a file
  ]
});

module.exports = logger;