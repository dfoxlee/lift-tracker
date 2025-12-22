import logger from "./logging-middleware.js";

export const errorMiddleware = (err, req, res, next) => {
   logger.error(`${err.message}`, {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      stack: err.stack,
   });

   console.error(err.stack);
   
   res.status(500).json({ message: err.message });
}