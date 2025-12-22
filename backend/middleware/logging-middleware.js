import winston from "winston";

export const logger = winston.createLogger({
   level: "info",
   format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
   ),
   transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "application.log" }),
   ],
});

export function loggingMiddleware(req, res, next) {
   logger.info(`${req.method} ${req.url}`, {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      headers: req.headers,
   });


   next();
}

export default logger;
