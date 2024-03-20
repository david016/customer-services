import express from "express";
import customerRouter from "./routes/customers.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/loggers.js";

const app = express();

app.use(express.json());
// middleware for logging
app.use(logger.expressWinstonLogger);

app.use("/customers", customerRouter);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});

// Error handling middleware
app.use(errorHandler);
app.use(logger.expressWinstonErrorLogger);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
